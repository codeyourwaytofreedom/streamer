import h from "../styles/Homie.module.css";
import { MouseEvent } from 'react';
import { useEffect, useRef, useState } from "react";
import punch from "../public/punch.svg";
import punchtwo from "../public/punchtwo.svg";
import puncher from "../public/puncher.svg";

import Image from "next/image";
import Fights_row from "./Fights";

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
      </div>
      <Fights_row/>
  </div>
  )
  
}

export default Homie;