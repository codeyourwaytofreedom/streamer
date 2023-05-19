import h from "../styles/Homie.module.css";
import { MouseEvent } from 'react';
import { useEffect, useRef, useState } from "react";
import punch from "../public/punch.svg";
import video from "../public/video.png";
import puncher from "../public/puncher.svg";
import Image from "next/image";
import Fights_row from "./Fights";

const Homie = () => {
  const weight_classes = ["Featherweight","Lightweight","Welterweight","Middleweight","light heavyweight","Cruiserweight","Heavyweight","Champions"]
  
  const forward = useRef<HTMLDivElement>(null);
  const anchor = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    window.addEventListener("resize", ()=>{
      if(forward.current && anchor.current){
        console.log(forward.current.offsetLeft,anchor.current.offsetLeft);
        console.log(forward.current.offsetLeft - anchor.current.offsetLeft)
      }
    })
  },[])
  
  return ( 
  <div className={h.homie}>
      <div className={h.homie_topBanner}>
        <div className={h.grid}>
          <div><Image alt={"punch"} src={punch}/></div>
          <div> <Image alt={"puncher"} src={puncher}/></div>
          <div><Image alt={"puncher"} src={puncher}/></div>
          <div><Image alt={"punch"} src={punch}/></div>
        </div>
        <div className={h.homie_topBanner_menu}>
            {
              weight_classes.map((c,i )=>
            <button className={h.homie_topBanner_menu_double} key={i}>
             <span>{c}</span>
            </button>
            )
            }
            <div ref={anchor}>.</div>
        </div>
        <div id={h.name} ref={forward}>
          <div id={h.forward}>X</div>
          <div id={h.double}>
            <div>My</div>
            <div><Image alt={"play"} src={video}/></div>
          </div>
            Tube
        </div>
        
      </div>
      <Fights_row/>
  </div>
  )
  
}

export default Homie;