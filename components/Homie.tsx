import h from "../styles/Homie.module.css";
import { MouseEvent } from 'react';
import { useEffect, useRef, useState } from "react";

const Homie = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [vid_url, setVidUrl] = useState<string>("boxing.mp4")
  const [chunkAdderId, setChunkAdderId] = useState<NodeJS.Timer | undefined>();

  let sourceBuffer: SourceBuffer;

  useEffect(() => {
    const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
    let bytesReceived = 0;
    let size:number;
    const chunk_size = 2000000;
    let chunk_adder: NodeJS.Timeout;
  
    if ("MediaSource" in window && MediaSource.isTypeSupported(mimeCodec)) {
      const mediaSource = new MediaSource();
      videoRef.current!.src = URL.createObjectURL(mediaSource);
      mediaSource.addEventListener("sourceopen", async () => {
        sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
        const response = await fetch(`http://localhost:3000/api/streamer`, {
          headers: { Range: "bytes=0-3999999", file:vid_url }, // Fetch the first chunk of the video
        })
        const arrayBuffer = await response.arrayBuffer();
        console.log(response.headers.get('Content-Range')?.split("/")[1])
        size = parseInt(response.headers.get('Content-Range')!.split("/")[1]);
        console.log(size)
        sourceBuffer.appendBuffer(arrayBuffer);
        bytesReceived += arrayBuffer.byteLength;
  
        const newChunkAdderId = setInterval(async () => {
            const start = bytesReceived < size ? bytesReceived : size;
            const end = bytesReceived + chunk_size - 1 < size ? bytesReceived + chunk_size - 1 : size;
  
            if (end === size || start === size) {
              clearInterval(chunk_adder);
              console.log("no more chunks to add")
              return;
            }
            const response = await fetch(`http://localhost:3000/api/streamer`, {
              headers: { Range: `bytes=${start}-${end}`, file:vid_url },
            });
  
            const arrayBuffer = await response.arrayBuffer();
            sourceBuffer.appendBuffer(arrayBuffer);
            bytesReceived += arrayBuffer.byteLength;
          }, 1000);
          setChunkAdderId(newChunkAdderId);
        });
    } else {
      console.error("Unsupported MIME type or codec: ", mimeCodec);
    }
    videoRef.current?.play();
  }, [vid_url]);
  
  const handle_video_change = (e:MouseEvent<HTMLButtonElement>) => {
    if(e.currentTarget.value !== vid_url){
        videoRef.current?.pause();
        clearInterval(chunkAdderId);
        setVidUrl(e.currentTarget!.value);
    }
  }

  return ( 
  <div className={h.homie}>
      <div className={h.homie_topBanner}></div>
      <div className={h.homie_videocontainer}>
          <video ref={videoRef} controls /> 
      </div>
      <div>
        <button value={"boxing.mp4"} onClick={e=>handle_video_change(e)}>One</button>
        <button value={"bunny.mp4"} onClick={e=>handle_video_change(e)}>Two</button>
        <button value={"she.mp4"} onClick={e=>handle_video_change(e)}>Three</button>
      </div>
  </div>
  )
  
}

export default Homie;