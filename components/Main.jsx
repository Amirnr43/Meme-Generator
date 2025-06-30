import { useEffect,useState , useRef} from "react";



export default function Main(){
    const [material , setMaterial] = useState({topText:"Who cares im gonna !", bottomText:"Go My own way"
       , imgUrl : "http://i.imgflip.com/1bij.jpg" 
    })
    const [meme,setmeme] = useState([])
    const canvasRef = useRef(null)
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setmeme(data.data.memes))
    },[])
    function imgChange(){
        const randomNumber = Math.floor(Math.random() * meme.length)
        const newMemeUrl = meme[randomNumber].url
        setMaterial(prevM =>(
            {...prevM
                ,
                imgUrl:newMemeUrl
            }

        ))
    }
    function textChange(event){
        const {value , name} = event.currentTarget
        setMaterial(prev => (
            {...prev,
                [name] : value
            }
        ))
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.crossOrigin = "anonymous"; // Fixes CORS issues for external images
        img.src = material.imgUrl;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0); // Draw the image

            // Style text (meme-like)
            ctx.font = "48px Impact";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.textAlign = "center";

            // Top text
            ctx.fillText(material.topText, canvas.width / 2, 50);
            ctx.strokeText(material.topText, canvas.width / 2, 50);

            // Bottom text
            ctx.fillText(material.bottomText, canvas.width / 2, canvas.height - 20);
            ctx.strokeText(material.bottomText, canvas.width / 2, canvas.height - 20);
        };
    }, [material.imgUrl, material.topText, material.bottomText]);

    // Trigger download
    const handleDownload = () => {
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL("image/png"); // Convert canvas to PNG
        const link = document.createElement("a");
        link.download = "meme.png"; // File name
        link.href = dataUrl;
        link.click(); // Simulate click to download
    };


    
   return(
        <main>
            <div className="form">
                <label>Top Text
                    <input type="text" placeholder="Who cares im gonna !" name="topText" onChange={textChange}
                     value={material.topText}/>
                </label>
                <label>Bottom Text
                    <input type="text" placeholder="Go My own way" name="bottomText" onChange={textChange} 
                     value={material.bottomText} />
                </label>
                <button onClick={imgChange}>Another Meme Image 🖼</button>
                <button onClick={handleDownload}>Download Meme</button>
            </div>
            <div className="meme">
                <img src={material.imgUrl}/>
                <span className="top">{material.topText}</span>
                <span className="bottom">{material.bottomText}</span>
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
        </main>
    )
}