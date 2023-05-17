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
            {  images.length !== 0 && images.map((image,index) => (
              <div className={h.homie_fights_each}>
                  <Link href={`/watch/${image.name.split(".")[0]}.mp4`} key={index}>
                      <Image
                      src={`data:image/jpeg;base64,${image.data}`}
                      alt={image.name}
                      width={400}
                      height={300}
                      />
                  </Link>
              </div>
            ))}
          <div className={h.homie_fights_column}>Hello</div>
        </div>
     );
}
 
export default Fights_row;
