import h from "../styles/Homie.module.css";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import a from "../excluded/thumbs/0.jpg";

interface Vid_Chan_Prop {
    handle_video_change: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Fights_row = ({handle_video_change}:Vid_Chan_Prop) => {
    const [test, setTest] = useState<string>();
    const [images, setImages] = useState<any[]>([]);

/*     useEffect(()=>{
        fetch("http://localhost:3000/api/thumbnails")
        .then(res => res.blob()).then(b => URL.createObjectURL(b)).then(r => setTest(r))
    },[]) */

/*     useEffect(() => {
        fetch('/api/thumbnails')
          .then(res => res.json())
          .then(data => {setImages(data.images); console.log(data.images)})
        
      }, []); */

      useEffect(() => {
        fetch('/api/thumbnails')
          .then((res) => res.json())
          .then((data) => setImages(data));
      }, []);

    return ( 
        <div className={h.homie_fights}>
            <button value={"boxing.mp4"} onClick={e=>handle_video_change(e)}>One</button>
            <button value={"bunny.mp4"} onClick={e=>handle_video_change(e)}>Two</button>
            <button value={"she.mp4"} onClick={e=>handle_video_change(e)}>Three</button>
            <Image src={"/api/thumbnails"} alt={"test"} width={300} height={300} />
            

            {
                test && <Image src={test} alt={"test"} width={300} height={300} /> 
            }

            {  images.length !== 0 && images.map((image) => (
                    <img
                    key={image.name}
                    src={`data:image/jpeg;base64,${image.data}`}
                    alt={image.name}
                    width={300}
                    height={300}
                    />
                ))}

        </div>
     );
}
 
export default Fights_row;
