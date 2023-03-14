### 视频转码为H264

### 项目运行
```shell
npm install

npm run dev

npm run serve
```

### 部分MP4视频文件无法在Chrome下播放的原因
对于两个不同的.mp4视频来说，虽然它们的后缀名是一样的，但是`两个MP4视频采用的编码格式可能是不一样的`，它们可以采用H.264或H.265的编码格式进行编码，也可以采用MPEG-4的编码方式。而对于MP4视频文件的播放，`Chrome只支持标准的H.264方式编码`。因此如果MP4视频的编码格式不是H.264，那么这个视频文件就无法正常播放。

那么，为什么Chrome只支持H.264这种编码方式而不支持所有的视频编码方式呢？网上给出的原因主要是说因为绝大部分的视频编码格式都要付专利费的，Google已经购买了H.264编码格式，而其它的就没有购买了，因此如果一个MP4视频不是H.264格式的，那么Chrome也是不支持播放的。


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
