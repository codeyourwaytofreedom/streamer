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
        <Image alt={"punch"} src={punch} id={h.one}/>
        <Image alt={"punch"} src={punchtwo} id={h.two}/>
        <Image alt={"puncher"} src={puncher} id={h.three}/>
        <Image alt={"puncher"} src={puncher} id={h.four}/>
      </div>

      <Fights_row/>
  </div>
  )
  
}

export default Homie;