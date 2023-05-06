import { useEffect, useRef } from "react";

const Homie = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
    let bytesReceived = 0;
  useEffect(() => {
    const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
    //const mimeCodec = 'video/mp4; codecs="avc1.64001F, mp4a.40.2"';

    const response = fetch(`http://localhost:3000/api/streamer`, {
      headers: { Range: "bytes=0-500", file:"bunny.mp4" }, // Fetch the first chunk of the video
    })
  }, []);

  return <>
    <video ref={videoRef} controls autoPlay>
      <source type={"video/mp4"} src={"/api/streamer"} />
    </video>
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