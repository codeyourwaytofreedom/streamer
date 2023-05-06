import { useEffect, useRef } from "react";

const Homie = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
    let bytesReceived = 0;
  useEffect(() => {
    const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
    const response = fetch(`http://localhost:3000/api/streamer`, {
      headers: { Range: "bytes=0-2999999", file:"tiger.mp4" }, // Fetch the first chunk of the video
    }).then(res => res.arrayBuffer())
    .then(aBuffer => {
      console.log(aBuffer);
      if ("MediaSource" in window && MediaSource.isTypeSupported(mimeCodec) && videoRef.current){
        const mediaSource = new MediaSource();
        videoRef.current!.src = URL.createObjectURL(mediaSource);
        const pump = () => {
          const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
          sourceBuffer.appendBuffer(aBuffer);
        }
        mediaSource.addEventListener("sourceopen", pump);
      }
      else {
        console.error("Unsupported MIME type or codec: ", mimeCodec);
      }
    })
  }, []);

  return <>
    <video ref={videoRef} controls autoPlay />
  </>
  
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