import { useEffect, useRef } from "react";

const Homie = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
    let bytesReceived = 0;

    if ("MediaSource" in window && MediaSource.isTypeSupported(mimeCodec)) {
      const mediaSource = new MediaSource();
      //console.log(mediaSource.readyState); // closed
      video.src = URL.createObjectURL(mediaSource);
      mediaSource.addEventListener("sourceopen", async () => {
        const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
        const response = await fetch(`http://localhost:3000/api/streamer`, {
          headers: { Range: "bytes=0-3999999", file:"tiger.mp4" }, // Fetch the first chunk of the video
        });
        const arrayBuffer = await response.arrayBuffer();
        sourceBuffer.appendBuffer(arrayBuffer);
        bytesReceived += arrayBuffer.byteLength;
        
        setInterval(async () => {
          const start = bytesReceived;
          const end = bytesReceived + 1000000 - 1;
          const response = await fetch(`http://localhost:3000/api/streamer`, {
            headers: { Range: `bytes=${start}-${end}`, file:"tiger.mp4" },
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

  return <video ref={videoRef} controls autoPlay />;
}
 
export default Homie;

