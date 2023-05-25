import h from "../styles/Slider.module.css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import right from "../public/right.png";

const Slider_menu = () => {
  const weight_classes = ["Featherweight","Lightweight","Welterweight","Middleweight","Light heavyweight","Featherweight","Lightweight","Welterweight","Middleweight","Light heavyweight","Cruiserweight","Heavyweight","Champions", "Knock-outs","Legends","Title fights"]
  
  const forward = useRef<HTMLDivElement>(null);
  const anchor = useRef<HTMLDivElement>(null);
  const [traX, setX] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [forVis, setForVis] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;

      const widthChange = currentWidth - previousWidth;

      if(currentWidth > previousWidth){
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

    calculateDistance();

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
      }, 100);
  }

  const handle_backward = () =>{
    if(traX + 50 > 0){
      setX(0)
    }
    else{
      setX(traX+50)
    }
  }

  useEffect(()=>{
    if(anchor.current && forward.current){
      if(anchor.current?.getBoundingClientRect().left > forward.current?.getBoundingClientRect().left){
        setForVis(true)
      }
      else{
        setForVis(false)
      }
    }
  },[anchor.current?.getBoundingClientRect().left, forward.current?.getBoundingClientRect().left]);

  useEffect(()=>{
    console.log("vis changed");
    if(anchor.current && forward.current){
      const margin = forward.current.getBoundingClientRect().left -  anchor.current!.getBoundingClientRect().left;
        console.log(margin);
        if(margin > 0){
          setX(traX + (margin+20))
        }
    }
  },[forVis])

  return ( 
  <div className={h.slider}>
        <button id={h.back} onClick={handle_backward} style={{visibility: traX < 0 ? "visible" : "hidden"}}> 
          <Image src={right} alt={"right"}/>
        </button>
      <div className={h.slider_topBanner}>
      <div id={h.backshadow} style={{visibility: traX < 0 ? "visible" : "hidden"}}></div>
        <div className={h.slider_topBanner_menu} style={{ transform: `translateX(${traX}px)` }}>
            {
              weight_classes.map((c,i )=>
            <button className={h.slider_topBanner_menu_double} key={i}>
             {c}
            </button>
            )
            }
            <div ref={anchor}></div>
        </div>
        <div id={h.name} ref={forward} style={{visibility:forVis ? "visible" : "hidden"}}>
          <button onClick={handle_forward} id={h.forward}>
            <div id={h.shadow}></div>
            <Image src={right} alt={"right"}/>
          </button>
        </div>
      </div>
  </div>
  )
  
}

export default Slider_menu;