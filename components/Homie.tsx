import { useEffect } from "react";
import h from "../styles/Homie.module.css";

const Homie = () => {
    
    const handle_stream = () => {
        console.log("clicked");
        
        fetch("http://localhost:3000/api/streamer", {
            method:"POST",
            body:"Testing",
            headers: { Range: 'bytes=0-100' }
        })
        .then(
            (response) => {
                console.log(response.body);
                const reader = response.body?.getReader();

                const chunks:any = [];

                function pump() {
                  reader!.read().then(({ value, done }) => {
                    if (done) {
                      // video chunk is complete
                      const videoChunk = new Uint8Array(chunks);
                      console.log(videoChunk);
                      return;
                    }
                    
                    chunks.push(value);
                    pump(); // read next chunk
                  });
                }
                pump(); // start reading the stream
                console.log(chunks)
            }
        )
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
                    <h1>Hello</h1>
                </div>
            </div>
            
            </>
        </>
     );
}
 
export default Homie;