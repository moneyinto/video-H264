// import MP4Box from "mp4box";
// import fs from "fs";
// import path from "path";
// import ffmpeg from "ffmpeg";

// console.log("ts");

// const mp4boxFile = MP4Box.createFile();

// mp4boxFile.onReady = (info) => {
//     let mime = info.mime;
//     let codec = mime.match(/codecs="(\S*),/)[1];
//     if (codec.indexOf("avc") === -1) {
//         console.log("需要解码");
//     }
// };

// const buffer = fs.readFileSync(path.resolve(__dirname, "./test.mp4"));

// // const reader = new FileReader();
// // const buffer2 = reader.readAsArrayBuffer(new Blob(buffer));
// // reader.onload = (e) => {
// //     var arrayBuffer = e.target!.result
// //     arrayBuffer!.fileStart = 0
// //     mp4boxFile.appendBuffer(arrayBuffer)
// // }
// // buffer.fileStart = 0;
// // mp4boxFile.appendBuffer(buffer);

// export const convertVideoH264 = (filePath: string, outputPath: string) => {
//     return new Promise((resolve, reject) => {
//         try {
//             const process = new ffmpeg(filePath);
//             process.then((video) => {
//                     video.setVideoCodec("h264").save(outputPath, (err) => {
//                         if (err) {
//                             reject("Error: " + err);
//                         } else {
//                             resolve(true);
//                         }
//                     });
//                 },
//                 (err) => {
//                     console.log("Error: " + err);
//                     reject(err);
//                 }
//             );
//         } catch (err) {
//             console.log("Error: " + err);
//             reject(err);
//         }
//     });
// }

// convertVideoH264(path.resolve(__dirname, "./test.mp4"), path.resolve(__dirname, "./output/output.mp4")).then(isFinish => {
//     console.log(isFinish);
// });

