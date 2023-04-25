import { useEffect } from "react";
import h from "../styles/Homie.module.css";
import { useState } from "react";

const Homie = () => {
    const [videoData, setVideoData] = useState<Blob>();
    const [videoUrl, setvideoUrl] = useState<string>();
    const handle_stream = () => {        
        fetch("http://localhost:3000/api/streamer", {
            method:"POST",
            body:"Testing",
            headers: { Range: 'bytes=0-9000000' }
        })
        .then((response) => {
            const reader = response.body?.getReader();
            let videoData:any = [];
            const read = () => {
                reader?.read().then(({ done, value }) => {
                    if (done) {
                        // all data has been read
                        const videoBlob = new Blob(videoData, { type: 'video/mp4' });
                        const videoUrl = URL.createObjectURL(videoBlob);
                        console.log(videoUrl);
                        setvideoUrl(videoUrl);
                        return;
                    }
                    videoData.push(value);
                    console.log(value)
                    read();
                });
            };
            read();
        })
        .catch((error) => {
            console.error(error);
        });
    }
    return ( 
        <>
            <>
            <div className={h.homie}>
                <div>
                    <button onClick={handle_stream}>TEST STREAM</button>
                    <h1>{videoUrl}</h1>
                    {
                        videoUrl &&
                        <video controls>
                            <source src={videoUrl} type="video/mp4" />
                        </video>
                    }
                </div>
            </div>
            
            </>
        </>
     );
}
 
export default Homie;