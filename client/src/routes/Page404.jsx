import { useNavigate } from 'react-router-dom';
import "./Page404.css";

const Page404 = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
      }

    return (
        <div className="main-404">
            <h1>Egaré ?</h1>
            <button onClick={handleClick} className="btn" style={{marginTop: "5vh", backgroundColor: "black", color: "white", border: "solid 1px white", padding: "1.5vh", borderRadius: "10px"}} >Retour à l'accueil</button>
        </div>
    )
}

export default Page404;