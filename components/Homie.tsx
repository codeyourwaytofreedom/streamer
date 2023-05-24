import h from "../styles/Homie.module.css";
import { MouseEvent } from 'react';
import { useEffect, useRef, useState } from "react";
import punch from "../public/punch.svg";
import video from "../public/video.png";
import puncher from "../public/puncher.svg";
import Image from "next/image";
import Fights_row from "./Fights";
import right from "../public/right.png";
import Slider_menu from "./Slider";

const Homie = () => {
  const weight_classes = ["Featherweight","Lightweight","Welterweight","Middleweight","Light heavyweight","Cruiserweight","Heavyweight","Champions", "Knock-outs","Legends","Title fights"]
  
  const forward = useRef<HTMLDivElement>(null);
  const anchor = useRef<HTMLDivElement>(null);
  const [traX, setX] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const[rightVis, setRightVis] = useState(true)


  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;

      const widthChange = currentWidth - previousWidth;

      if(currentWidth > previousWidth){
        console.log(traX,"enlarging")
        if(traX !== 0 && traX < 0){
          setX(traX + widthChange)
        }
        else{
          setX(0)
        }
      }
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
      setDistance(forward.current.offsetLeft - anchor.current.offsetLeft)
    }

    const distance_handler = () =>{
      if(forward.current && anchor.current){
        setDistance(forward.current.offsetLeft - anchor.current.offsetLeft)
      }
    }
    
    window.addEventListener("resize", distance_handler)
    return () => {
      window.removeEventListener('resize', distance_handler);
    };
  },[traX])
  
  const handle_forward = () =>{
    if(window.innerWidth < 800){
      if(distance -  (traX-50) > 55){
        setX(traX - (55-(distance-traX)))
      }
      else{
        setX(traX-50);
      }
    }
    else{
      if(distance -  (traX-50) > 150){
        setX(traX - (150-(distance-traX)))
      }
      else{
        setX(traX-50)
      }
      
    }
      
  }

  const handle_backward = () =>{
    if(traX + 50 > 0){
      setX(0)
    }
    else{
      setX(traX+50)
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
        <div id={h.name} ref={forward}>
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