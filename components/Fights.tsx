import h from "../styles/Homie.module.css";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import a from "../excluded/thumbs/0.jpg";
import Link from "next/link";

interface Vid_Chan_Prop {
    handle_video_change: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Fights_row = ({handle_video_change}:Vid_Chan_Prop) => {
    const [images, setImages] = useState<any[]>([]);

      useEffect(() => {
        fetch('/api/thumbnails')
          .then((res) => res.json())
          .then((data) => setImages(data));
      }, []);

    return ( 
        <div className={h.homie_fights}>
{/*             <button value={"boxing.mp4"} onClick={e=>handle_video_change(e)}>One</button>
            <button value={"bunny.mp4"} onClick={e=>handle_video_change(e)}>Two</button>
            <button value={"she.mp4"} onClick={e=>handle_video_change(e)}>Three</button> */}

            {  images.length !== 0 && images.map((image) => (
                <Link href={`/watch/${image.name.split(".")[0]}.mp4`}>
                    <img
                    key={image.name}
                    src={`data:image/jpeg;base64,${image.data}`}
                    alt={image.name}
                    />
                </Link>
                ))}

        </div>
     );
}
 
export default Fights_row;
