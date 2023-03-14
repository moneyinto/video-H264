import MP4Box from "mp4box";

window.onload = () => {
    const input = document.getElementById("input") as HTMLInputElement;
    const originVideo = document.getElementById("originVideo") as HTMLVideoElement;
    const resultVideo = document.getElementById("resultVideo") as HTMLVideoElement;
    const loading = document.getElementById("loading");

    const uploadFile = (file: File) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:4000/api/tranformVideoH264", false);
        const body = new FormData();
        body.append("file", file)
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.responseText);
                if (res.success) {
                    originVideo.src = `http://localhost:4000/uploads/${res.result}`;
                    resultVideo.src = `http://localhost:4000/output/${res.result}`;
                }
            }
            if (loading) loading.style.display = "none";
        }
        xhr.send(body);
    };
    
    if (input) {
        input.onchange = (event) => {
            const files = (<HTMLInputElement>event.target).files;
            if (files && files.length > 0) {
                const file = files[0];
                if (file.type.indexOf("mp4") === -1) return alert("只支持mp4");
                if (loading) loading.style.display = "inline-block";
                const mp4boxFile = MP4Box.createFile();

                mp4boxFile.onReady = (info) => {
                    let mime = info.mime;
                    let codecs = mime.match(/codecs="(\S*),/);
                    if (codecs && codecs[1].indexOf("avc") === -1) {
                        console.log("需要解码");
                        uploadFile(file);
                    } else {
                        alert("不需要转码");
                        if (loading) loading.style.display = "none";
                    }
                };

                const reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onload = (e) => {
                    const arrayBuffer = e.target?.result;
                    console.log(arrayBuffer);
                    if (arrayBuffer) {
                        (arrayBuffer as any).fileStart = 0;
                        mp4boxFile.appendBuffer(arrayBuffer);
                    }
                };
            }
        };
    }
};
