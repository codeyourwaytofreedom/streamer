import { useEffect, useRef, useState } from "react";

const Homie = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);


  useEffect(() => {
    const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
    let bytesReceived = 0;

    if ("MediaSource" in window && MediaSource.isTypeSupported(mimeCodec)) {
      const mediaSource = new MediaSource();
      videoRef.current!.src = URL.createObjectURL(mediaSource);
      mediaSource.addEventListener("sourceopen", async () => {
        const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
        const response = await fetch(`http://localhost:3000/api/streamer`, {
          headers: { Range: "bytes=0-3999999", file:"she.mp4" }, // Fetch the first chunk of the video
        });
        const arrayBuffer = await response.arrayBuffer();
        sourceBuffer.appendBuffer(arrayBuffer);
        bytesReceived += arrayBuffer.byteLength;

        const chunk_adder = setInterval(async () => {
          const start = bytesReceived;
          const end = bytesReceived + 50000 - 1;
          
          if (bytesReceived >= 4500000) {
            clearInterval(chunk_adder);
            console.log("no more chunks to add")
            return;
          }
          
          const response = await fetch(`http://localhost:3000/api/streamer`, {
            headers: { Range: `bytes=${start}-${end}`, file:"she.mp4" },
          });
          
          const arrayBuffer = await response.arrayBuffer();
          sourceBuffer.appendBuffer(arrayBuffer);
          bytesReceived += arrayBuffer.byteLength;
        }, 2000);        
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