import h from "../styles/Homie.module.css";
import { MouseEvent } from 'react';
import { useEffect, useRef, useState } from "react";
import punch from "../public/punch.svg";
import video from "../public/video.png";
import puncher from "../public/puncher.svg";
import Image from "next/image";
import Fights_row from "./Fights";
import Slider_menu from "./Slider";

const Homie = () => {

  return ( 
  <div className={h.homie}>
      <div className={h.homie_topBanner}>
        <div className={h.grid}>
          <div><Image alt={"punch"} src={punch}/></div>
          <div> <Image alt={"puncher"} src={puncher}/></div>
          <div><Image alt={"puncher"} src={puncher}/></div>
          <div><Image alt={"punch"} src={punch}/></div>
        </div>
        <div className={h.search}>
          <div className={h.search_kernel}>
                <input type={"text"} placeholder={"search for fights"} />
          </div>
        </div>
        <div id={h.name}>
          <div id={h.double}>
            <div>My</div>
            <div><Image alt={"play"} src={video}/></div>
          </div>
            Tube
        </div>
      </div>
      <Slider_menu />

      <Fights_row/>
  </div>
  )
  
}

export default Homie;