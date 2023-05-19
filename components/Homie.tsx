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
  const [arrow_vis, setArrowVis] = useState(false);
  const [traX, setX] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);

  const [widthChange, setWidthChange] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;

      const widthChange = currentWidth - previousWidth;

      if(traX < 0){
        console.log(traX,"0 dan büyük değil")
        setX(traX + widthChange)
      }

      setWidthChange(widthChange);

      // Update previous size with the current size
      previousWidth = currentWidth;
    }

    let previousWidth = window.innerWidth;

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [traX]);


  useEffect(()=>{
    if(forward.current && anchor.current){
      setDistance(forward.current.offsetLeft - anchor.current.offsetLeft - 15)
    }
    
    window.addEventListener("resize", ()=>{
      if(forward.current && anchor.current){
        setDistance(forward.current.offsetLeft - anchor.current.offsetLeft)
        if(forward.current.offsetLeft - anchor.current.offsetLeft < 100){
          setArrowVis(true)
        }
        else{
          setArrowVis(false)
        }
      }
    })
  },[traX])
  
  const handle_forward = () =>{
    if(distance-traX < 100){
      setArrowVis(true)
    }
    else{
      setArrowVis(false)
    }
    if(arrow_vis){
      setX(traX-50)
    }
  }

  return ( 
  <div className={h.homie}>
      <div className={h.homie_topBanner}>
        <div className={h.grid}>
          <div><Image alt={"punch"} src={punch}/></div>
          <div> <Image alt={"puncher"} src={puncher}/></div>
          <div><Image alt={"puncher"} src={puncher}/></div>
          <div><Image alt={"punch"} src={punch}/></div>
        </div>
        <div className={h.homie_topBanner_menu} style={{ transform: `translateX(${traX}px)` }}>
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
          <button onClick={handle_forward} id={h.forward} style={{visibility: arrow_vis ? "visible" : "hidden"}}>X</button>
          <div id={h.double}>
            <div>My</div>
            <div><Image alt={"play"} src={video}/></div>
          </div>
            Tube
        </div>
      </div>
      <h1>Distance: {distance} - Tra_X: {traX} - Difference: {distance-traX} Width-Change: {widthChange}</h1>
      <Fights_row/>
  </div>
  )
  
}

export default Homie;