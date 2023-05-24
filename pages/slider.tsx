import h from "../styles/Slider.module.css";
import { useEffect, useRef, useState } from "react";
import video from "../public/video.png";
import Image from "next/image";
import right from "../public/right.png";

const Slider_tester = () => {
  const weight_classes = ["Featherweight","Lightweight","Welterweight","Middleweight","Featherweight","Lightweight","Welterweight","Middleweight","Light heavyweight","Cruiserweight","Heavyweight","Champions", "Knock-outs","Legends","Title fights"]
  
  const forward = useRef<HTMLDivElement>(null);
  const anchor = useRef<HTMLDivElement>(null);
  const [traX, setX] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);

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


  useEffect(() => {
    const calculateDistance = () => {
      if (forward.current && anchor.current) {
        const forwardRect = forward.current.getBoundingClientRect();
        const anchorRect = anchor.current.getBoundingClientRect();
        const distanceX = forwardRect.left - anchorRect.left;
        setDistance(distanceX);
      }
    };

    calculateDistance(); // Initial calculation

    const resizeHandler = () => {
      calculateDistance();
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);
  
  const handle_forward = () =>{
      setX(traX-50);
      setTimeout(() => {
        setDistance(distance+50)
      }, 10);
  }

  const handle_backward = () =>{
    if(traX + 50 > 0){
      setX(0)
    }
    else{
      setX(traX+50)
      setTimeout(() => {
        setDistance(distance-50)
      }, 10);
    }
}

  return ( 
  <div className={h.slider}>
      <div className={h.slider_topBanner}>
        <button id={h.back} onClick={handle_backward} style={{display: traX < 0 ? "grid" : "none"}}> 
          <Image src={right} alt={"right"}/>
        </button>
        <div className={h.slider_topBanner_menu} style={{ transform: `translateX(${traX}px)` }}>
            {
              weight_classes.map((c,i )=>
            <button className={h.slider_topBanner_menu_double} key={i}>
             {c}
            </button>
            )
            }
            <div ref={anchor}>x</div>
        </div>
        <div id={h.name} ref={forward} style={{visibility:distance < -5 ? "visible" : "hidden"}}>
          <button onClick={handle_forward} id={h.forward}>
            <Image src={right} alt={"right"}/>
          </button>
        </div>
      </div>
        <h1>Distance: {distance} - Tra_X: {traX} - Difference: {distance-traX}</h1>
  </div>
  )
  
}

export default Slider_tester;