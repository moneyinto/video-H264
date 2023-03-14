### 视频转码为H264

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