import { useNavigate } from "react-router-dom";
import "./Header.css";
import home from '../assets/home.jpg';

export default function Header() {

  const navigate = useNavigate();

  const handleAdding = () => {
    navigate('/albums/add')
  }

  const handleRegister = () => {
    navigate('/register')
  }
  
  const handleSubmit = () => {
    navigate("/login")
  }

  return (
    <>
      <div className='header'>
        <img src={home} className="header-img" alt="logo-MetalMania" onClick={()=>navigate(`/`)}/>

        <div className='header-categories'>
          {/* <button type="button" class="btn btn-secondary">Death Metal</button>
          <button type="button" class="btn btn-danger">Doom Metal</button>
          <button type="button" class="btn btn-warning">Folk Metal</button>
          <button type="button" class="btn btn-dark">Black Metal</button>
          <button type="button" class="btn btn-light">Autres</button>    */}
          <button type="button" className="btn btn-primary add-button" onClick={handleAdding}>Ajouter un nouvel album</button>   
        </div>

        <div className='header-connection'>
          <button onClick={handleSubmit} className="btn btn-primary" >Se connecter</button>
          <button onClick={handleRegister} className="btn btn-primary" >S'inscrire</button>     
        </div>
      </div> 
      <div className='header-bottom'></div>
    </>
  )
}