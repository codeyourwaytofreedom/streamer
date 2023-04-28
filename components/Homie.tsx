import { useEffect, useRef } from "react";
import h from "../styles/Homie.module.css";
import { useState } from "react";
import ReactPlayer from 'react-player';




const Homie = () => {

    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [chunks, setChunks] = useState<Uint8Array[]>([]);
    const start = 0;
    const end = 1000000;
    const videoRef = useRef<HTMLVideoElement>(null);

    const add = () => {
        const fetchData = async () => {
            try {
              const response = await fetch(
                `http://localhost:3000/api/streamer`,
                {
                  method: 'GET',
                  headers: { Range: `bytes=${start}-${end}`, file: 'boxing.mp4' },
                }
              );
              const reader = response.body?.getReader();
              const receivedChunks: Uint8Array[] = [];
      
              const read = () => {
                reader?.read().then(({ done, value }) => {
                  if (done) {
                    const videoBlob = new Blob(chunks, { type: 'video/mp4' });
                    const videoUrl = URL.createObjectURL(videoBlob);
                    setVideoUrl(videoUrl);
                    console.log("one",receivedChunks);
                    console.log("two",chunks);
                    return;
                  }
                  receivedChunks.push(value);
                  chunks.push(value)
                  read();
                });
              };
              read();
            } catch (error) {
              console.error(error);
            }
          };
          fetchData();
    }

    const add2 = () => {
      const fetchData = async () => {
          try {
            const response = await fetch(
              `http://localhost:3000/api/streamer`,
              {
                method: 'GET',
                headers: { Range: `bytes=${end}-${end+200000}`, file: 'boxing.mp4' },
              }
            );
            const reader = response.body?.getReader();
            const receivedChunks: Uint8Array[] = [];
    
            const read = () => {
              reader?.read().then(({ done, value }) => {
                if (done) {
                  const videoBlob = new Blob(chunks, { type: 'video/mp4' });
                  const videoUrl = URL.createObjectURL(videoBlob);
                  setVideoUrl(videoUrl);
                  console.log("one",receivedChunks);
                  console.log("two",chunks);
                  return;
                }
                receivedChunks.push(value);
                chunks.push(value)
                read();
              });
            };
            read();
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
  }

    return ( 
        <>
            <>
            <div className={h.homie}>
                <div>
                    <button onClick={add}>PART ONE</button>
                    <button onClick={add2}>PART TWO</button>
                    <h1>{videoUrl}</h1>
                    {
                        videoUrl &&
                        <video src={videoUrl} ref={videoRef} controls />

                    }
                </div>
            </div>
            
            </>
        </>
     );
}
 
export default Homie;