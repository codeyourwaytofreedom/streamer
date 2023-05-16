import h from "../styles/Homie.module.css";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";


const Fights_row = () => {
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

            {  images.length !== 0 && images.map((image,index) => (
                <Link href={`/watch/${image.name.split(".")[0]}.mp4`}>
                    <Image
                    key={index}
                    src={`data:image/jpeg;base64,${image.data}`}
                    alt={image.name}
                    width={400}
                    height={300}
                    />
                </Link>
                ))}

        </div>
     );
}
 
export default Fights_row;
