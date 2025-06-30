import trollpic from "../images/troll-face.png"


export default function Header(){
    return(
        <header className="header">
            <img src={trollpic} />
            <h1>Random Meme Generator</h1>
        </header>
    )
}