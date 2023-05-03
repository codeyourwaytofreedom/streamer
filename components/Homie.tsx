import { useEffect, useRef } from "react";

const Homie = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';

    if ("MediaSource" in window && MediaSource.isTypeSupported(mimeCodec)) {
      const mediaSource = new MediaSource();
      //console.log(mediaSource.readyState); // closed
      video.src = URL.createObjectURL(mediaSource);
      mediaSource.addEventListener("sourceopen", async () => {
        const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
        const response = await fetch(`http://localhost:3000/api/streamer`, {
          headers: { Range: "bytes=0-1999999", file:"boxing.mp4" }, // Fetch the first chunk of the video
        });
        const arrayBuffer = await response.arrayBuffer();
        sourceBuffer.appendBuffer(arrayBuffer);
      });
    } else {
      console.error("Unsupported MIME type or codec: ", mimeCodec);
    }
  }, []);

  return <video ref={videoRef} controls />;
}
 
export default Homie;

