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
              <div className={h.homie_fights_each} key={index}>
                  <Link href={`/watch/${image.name.split(".")[0]}.mp4`}>
                      <Image
                      src={`data:image/jpeg;base64,${image.data}`}
                      alt={image.name}
                      width={400}
                      height={300}
                      />
                  </Link>
              </div>
            ))}
          <div className={h.homie_fights_column}>
            <div className={h.homie_fights_column_each}>
              <div><Image src={"/game.png"} width={30} height={30} alt={"training"}/></div>
              <div>Fights</div>
            </div>
            <div className={h.homie_fights_column_each}>
              <div><Image src={"/workout.png"} width={30} height={30} alt={"training"}/></div>
              <div>Workouts</div>
            </div>
            <div className={h.homie_fights_column_each}>
              <div><Image src={"/interview.png"} width={30} height={30} alt={"training"}/></div>
              <div>Interviews</div>
            </div>
          </div>
        </div>
     );
}
 
export default Fights_row;
