import express from "express";
import ffmpeg from "ffmpeg";
import Busboy from "busboy";
import fs from "fs";
import path from "path";

const app = express();

app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "PUT, GET, POST, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", [
        "Content-Type",
        "form-data"
    ]);
    next();
});

app.use(express.static(path.join(__dirname, "./assets")));

const convertVideoH264 = (filePath: string, outputPath: string) => {
    return new Promise((resolve, reject) => {
        try {
            const process = new ffmpeg(filePath);
            process.then(
                (video) => {
                    video.setVideoCodec("h264").save(outputPath, (err) => {
                        if (err) {
                            reject("Error: " + err);
                        } else {
                            resolve(true);
                        }
                    });
                },
                (err) => {
                    console.log("Error: " + err);
                    reject(err);
                }
            );
        } catch (err) {
            console.log("Error: " + err);
            reject(err);
        }
    });
};

const createRandomCode = (len = 6) => {
    const charset =
        "_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const maxLen = charset.length;
    let ret = "";
    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * maxLen);
        ret += charset[randomIndex];
    }
    return ret;
};

app.get("/api/tranformVideoH264", (req, res) => {
    res.send({
        success: false,
        msg: "只支持mp4文件的文件转码"
    });
})


app.post("/api/tranformVideoH264", (req, res) => {
    const name = createRandomCode(6) + new Date().getTime();
    const busboy = Busboy({ headers: req.headers });
    let saveTo = "";

    busboy.on(
        "file",
        (
            fieldname: string,
            file: { pipe: (arg0: fs.WriteStream) => void },
            info: Busboy.FileInfo
        ) => {
            saveTo = path.join(__dirname, "./assets/uploads", `${name}.mp4`);
            const uploadPath = path.join(__dirname, "./assets/uploads");
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath);
            }
            file.pipe(fs.createWriteStream(saveTo));
        }
    );

    busboy.on("finish", async () => {
        if (saveTo) {
            try {
                convertVideoH264(saveTo, path.resolve(__dirname, `./assets/output/${name}.mp4`)).then(isFinish => {
                    if (isFinish) {
                        res.send({
                            success: true,
                            msg: "转码成功",
                            result: `${name}.mp4`
                        });
                    }
                });
            } catch (err) {
                console.log("转码失败:", err);
                res.send({
                    success: false,
                    msg: "转码失败"
                });
            }
        } else {
            res.send({
                success: false,
                msg: "转码失败"
            });
        }
    });

    return req.pipe(busboy);
});

app.listen("4000", () => {
    console.log("api listen on 4000");
});
