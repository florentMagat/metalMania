import { useNavigate } from 'react-router-dom';
import "./Page404.css";

const Page404 = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/")
      }

    return (
        <div className="main">
            <h1>Egaré ?</h1>
            <button onClick={handleClick} className="btn btn-primary" style={{marginTop: "5vh"}} >Retour à l'accueil</button>
        </div>
    )
}

export default Page404;