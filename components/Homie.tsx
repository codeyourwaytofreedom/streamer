import { useEffect } from "react";
import h from "../styles/Homie.module.css";

const Homie = () => {
    
    const handle_stream = () => {
        console.log("clicked");
        fetch("http://localhost:3000/api/streamer", {
            method:"POST",
            body:"Body Content"
        }).then(response => response.json()).then(data => console.log(data))
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