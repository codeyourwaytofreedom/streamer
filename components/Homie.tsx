import { useEffect, useRef, useState } from "react";

const Homie = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);


  useEffect(() => {
    const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
    let bytesReceived = 0;
    let size:number;

    if ("MediaSource" in window && MediaSource.isTypeSupported(mimeCodec)) {
      const mediaSource = new MediaSource();
      videoRef.current!.src = URL.createObjectURL(mediaSource);
      mediaSource.addEventListener("sourceopen", async () => {
        const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
        const response = await fetch(`http://localhost:3000/api/streamer`, {
          headers: { Range: "bytes=0-3999999", file:"boxing.mp4" }, // Fetch the first chunk of the video
        })
        const arrayBuffer = await response.arrayBuffer();
        console.log(response.headers.get('Content-Range')?.split("/")[1])
        size = parseInt(response.headers.get('Content-Range')!.split("/")[1]);
        console.log(size)
        sourceBuffer.appendBuffer(arrayBuffer);
        bytesReceived += arrayBuffer.byteLength;

        const chunk_adder = setInterval(async () => {
          const start = bytesReceived < size ? bytesReceived : size;
          const end = bytesReceived + 3000000 - 1 < size ? bytesReceived + 50000 - 1 : size;
          
          if (end === size || start === size) {
            clearInterval(chunk_adder);
            console.log("no more chunks to add")
            return;
          }
          
          const response = await fetch(`http://localhost:3000/api/streamer`, {
            headers: { Range: `bytes=${start}-${end}`, file:"boxing.mp4" },
          });
          
          const arrayBuffer = await response.arrayBuffer();
          sourceBuffer.appendBuffer(arrayBuffer);
          bytesReceived += arrayBuffer.byteLength;
        }, 500);        
      });
    } else {
      console.error("Unsupported MIME type or codec: ", mimeCodec);
    }
  }, []);

  return ( <>
  <button>One</button>
  <button>Two</button>
  <button>Three</button>
      <video ref={videoRef} controls />;
  </>
  )
  
}

export default Homie;

/*         bytesReceived += arrayBuffer.byteLength;
        
        setInterval(async () => {
          const start = bytesReceived;
          const end = bytesReceived + 1000000 - 1;
          const response = await fetch(`http://localhost:3000/api/streamer`, {
            headers: { Range: `bytes=${start}-${end}`, file:"boxing.mp4" },
          });
          const arrayBuffer = await response.arrayBuffer();
          sourceBuffer.appendBuffer(arrayBuffer);
          bytesReceived += arrayBuffer.byteLength;
        }, 1000); */