import h from "../../styles/Homie.module.css";
import v from "../../styles/Video.module.css";

import { useEffect, useRef, useState } from "react";
import punch from "../../public/punch.svg";
import puncher from "../../public/puncher.svg";
import { useRouter } from "next/router";
import Image from "next/image";
import video from "../../public/video.png";

const Watch = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [chunkAdderId, setChunkAdderId] = useState<NodeJS.Timer | undefined>();
  
  let sourceBuffer: SourceBuffer;
  
  useEffect(() => {
    if(router.query.video){
    const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
    let bytesReceived = 0;
    let size:number;
    const chunk_size = 2000000;
  
    if ("MediaSource" in window && MediaSource.isTypeSupported(mimeCodec)) {
      const mediaSource = new MediaSource();
      videoRef.current!.src = URL.createObjectURL(mediaSource);
      mediaSource.addEventListener("sourceopen", async () => {
        sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
        const response = await fetch(`http://localhost:3000/api/streamer`, {
          headers: { Range: "bytes=0-3999999", file:router.query.video as string }, // Fetch the first chunk of the video
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
              clearInterval(chunkAdderId);
              return;
            }
            const response = await fetch(`http://localhost:3000/api/streamer`, {
              headers: { Range: `bytes=${start}-${end}`, file:router.query.video as string  },
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
  }
  }, [router.query]);
      
    return ( 
    <>
        <div className={h.homie_topBanner}>
          <div className={h.grid}>
            <div><Image alt={"punch"} src={punch}/></div>
            <div> <Image alt={"puncher"} src={puncher}/></div>
            <div><Image alt={"puncher"} src={puncher}/></div>
            <div><Image alt={"punch"} src={punch}/></div>
          </div>
          <div className={h.search}>
            <div className={h.search_kernel}>
                  <input type={"text"} placeholder={"search for fights"} />
            </div>
          </div>
          <div id={h.name}>
            <div id={h.double}>
              <div>My</div>
              <div><Image alt={"play"} src={video}/></div>
            </div>
              Tube
          </div>
        </div>

        <div className={v.video_container}>
              <video ref={videoRef} controls /> 
        </div>

        <div className={v.more}>
          More to see
        </div>
    </>
    )
}
 
export default Watch;