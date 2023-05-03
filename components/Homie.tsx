import h from "../styles/Homie.module.css";


const Homie = () => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [chunks, setChunks] = useState<Uint8Array[]>([]);
    const [b_range,setRange] = useState({start:0, end:2000000})
    const videoRef = useRef<HTMLVideoElement>(null);
    const chunker_button = useRef<HTMLButtonElement>(null);
    const [cTime, setCurrentTime] = useState(0);
    const chunk_size = 1000000;
    
    useEffect(()=> {
      console.log("initial")
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/streamer`,
            {
              method: 'GET',
              headers: { Range: `bytes=${b_range.start}-${b_range.end}`, file: 'boxing.mp4' },
            }
          );
          const reader = response.body?.getReader();    
          let reservoir:Uint8Array[]=[];  
          const read = () => {
            reader?.read().then(({ done, value }) => {
              if (done) {
                const videoBlob = new Blob(reservoir, { type: 'video/mp4' });
                const videoUrl = URL.createObjectURL(videoBlob);
                setVideoUrl(videoUrl);
                setChunks(reservoir);
                return;
              }
              reservoir.push(value);
              read();
            });
          };
          read();
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
      setRange({start:b_range.end, end:b_range.end+chunk_size});
    },[]);
    
    const [last, setLast] = useState(0);

    useEffect(()=>{
      if(videoRef.current){
        
        if(cTime-videoRef.current.currentTime === 0){
          //console.log("this is the spot I am looking for");
          videoRef.current.currentTime = last;
          //console.log(last)
        }
        else{
          //console.log("good technique...aha");
          //console.log(cTime);
          setLast(cTime)
        }
      }
    },[cTime])

/*     useEffect(() => {
      const intervalId = setInterval(() => {
        chunker_button.current?.click();
        console.log("Interval working")
      }, 10000);
      return () => clearInterval(intervalId);
    }, []); */


    const add = () => {
      //console.log("last displayed after add click",last);
      setRange({start:b_range.end, end:b_range.end+chunk_size});
        const fetchData = async () => {
            try {
              const response = await fetch(
                `http://localhost:3000/api/streamer`,
                {
                  method: 'GET',
                  headers: { Range: `bytes=${b_range.start}-${b_range.end}`, file: 'boxing.mp4' },
                }
              );
              const reader = response.body?.getReader();   
              let reservoir:Uint8Array[]=[];    
              chunks.map(c=> reservoir.push(c));
              const read = () => {
                reader?.read().then(({ done, value }) => {
                  if (done) {
                    const videoBlob = new Blob(reservoir, { type: 'video/mp4' });
                    const videoUrl = URL.createObjectURL(videoBlob);
                    setVideoUrl(videoUrl);
                    setChunks(reservoir);
                    return;
                  }
                  reservoir.push(value)
                  read();
                });
              };
              read();
            } catch (error) {
              console.error(error);
            }
          };
          fetchData();
    }

    return ( 
        <>
            <>
            <div className={h.homie}>
                <div>
                    <button onClick={add} ref={chunker_button}>PART ONE</button>
                    {/* <h1>Chunks : {chunks.length}</h1> */}
                    <h1>Last Time: {last.toFixed(2)}</h1>
                    {/* <h1>{videoUrl}</h1> */}
                    <h1>{b_range.start} - {b_range.end}</h1>
                    {
                        videoUrl &&
                        <video src={videoUrl} ref={videoRef} 
                        onTimeUpdate={()=> setCurrentTime(videoRef.current!.currentTime)}
                        controls
                        autoPlay
                        width={"600px"} height={"300px"}
                         />
                    }
                </div>
            </div>
            
            </>
        </>
     );
}
 
export default Homie;

