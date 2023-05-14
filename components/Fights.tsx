import h from "../styles/Homie.module.css";
import { MouseEvent, useEffect } from "react";

interface Vid_Chan_Prop {
    handle_video_change: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Fights_row = ({handle_video_change}:Vid_Chan_Prop) => {
    useEffect(()=>{
        fetch("http://localhost:3000/api/thumbnails").then(res => res.text()).then(tx => console.log(tx))
    },[])
    return ( 
        <div className={h.homie_fights}>
            <button value={"boxing.mp4"} onClick={e=>handle_video_change(e)}>One</button>
            <button value={"bunny.mp4"} onClick={e=>handle_video_change(e)}>Two</button>
            <button value={"she.mp4"} onClick={e=>handle_video_change(e)}>Three</button>
        </div>
     );
}
 
export default Fights_row;
