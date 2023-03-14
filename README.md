### 视频转码为H264

#### 电脑系统有ffmpeg的情况，比如服务器部署
```ts
import ffmpeg from "ffmpeg";

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
```

#### 电脑系统没有ffmpeg的情况，比如electron应用，安装在不同的电脑，存在电脑没有ffmpeg的情况
```ts
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";

ffmpeg.setFfmpegPath(ffmpegPath.path);

const convertVideoH264 = (filePath: string, outputPath: string) => {
    return new Promise((resolve, reject) => {
        try {
            ffmpeg(filePath)
                .videoCodec("libx264")
                .on("end", () => {
                    resolve(true);
                })
                .save(outputPath);
        } catch (err) {
            console.log("Error: " + err);
            reject(err);
        }
    });
};
```
