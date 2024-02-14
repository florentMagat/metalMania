import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import home from '../assets/home.jpg';
import { GenreContext } from "../routes/Home";

export default function Header() {

  const navigate = useNavigate();
  const { setGenre } = useContext(GenreContext);

  const handleAdding = () => {
    navigate('/albums/add')
  }
  
  const handleSubmit = () => {
    navigate("/login")
  }

  const handleDashboard = () => {
    navigate("/dashboard")
  }

  const handleUserDashboard = () => {
    navigate("/user/dashboard")
  }

  let email = sessionStorage.getItem('email');
  let role = sessionStorage.getItem('role');

  if (email && role === "1"){
    return (
      <>
        <div className='header'>
          <img src={home} className="header-img" alt="logo-MetalMania" onClick={()=>navigate(`/`)}/>
          <div className='buttons'>
            <div className='header-categories'>
              <button type="button" className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}}
                onClick={()=> setGenre("")}>
                  Tous
              </button>
              {/* <button type="button" className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}}
                onClick={()=> setGenre("Top 10")}>
                  Top 10
              </button> */}
              <button type="button" className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}}
                onClick={()=> setGenre("Death Metal")}>
                  Death Metal
              </button>
              <button type="button" className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}}
                onClick={()=> setGenre("Doom Metal")}>
                  Doom Metal
              </button>
              <button type="button" className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}}
                onClick={()=> setGenre("Folk Metal")}>
                  Folk Metal
              </button>
              <button type="button" className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}}
                onClick={()=> setGenre("Black Metal")}>
                  Black Metal
              </button>
              <button type="button" className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}}
                onClick={()=> setGenre("Autres")}>
                  Autres
              </button>     
              <button type="button" className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}} onClick={handleAdding}>Ajouter un nouvel album</button>   
            </div>
    
            <div className='header-connection'>
              <button onClick={handleSubmit} className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}} >Se déconnecter</button>   
              <button onClick={handleDashboard} className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}} >Dashboard</button>
            </div>
          </div>
        </div> 
        <div className='header-bottom'></div>
      </>
    );
  } else if (email && role === "2"){
    return (
      <>
        <div className='header'>
          <img src={home} className="header-img" alt="logo-MetalMania" onClick={()=>navigate(`/`)}/>
          <div className='buttons'>
            <div className='header-categories'>
              <button type="button" className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}}
                onClick={()=> setGenre("")}>
                  Tous
              </button>
              {/* <button type="button" className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}}
                onClick={()=> setGenre("Top 10")}>
                  Top 10
              </button> */}
              <button type="button" className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}}
                onClick={()=> setGenre("Death Metal")}>
                  Death Metal
              </button>
              <button type="button" className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}}
                onClick={()=> setGenre("Doom Metal")}>
                  Doom Metal
              </button>
              <button type="button" className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}}
                onClick={()=> setGenre("Folk Metal")}>
                  Folk Metal
              </button>
              <button type="button" className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}}
                onClick={()=> setGenre("Black Metal")}>
                  Black Metal
              </button>
              <button type="button" className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}}
                onClick={()=> setGenre("Autres")}>
                  Autres
              </button>       
            </div>
    
            <div className='header-connection'>
              <button onClick={handleSubmit} className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}} >Se déconnecter</button>  
              <button onClick={handleUserDashboard} className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}} >Mon Compte</button> 
            </div>
          </div>
        </div> 
        <div className='header-bottom'></div>
      </>
    )} else { 
      return () => {
        navigate('/login')
      }
  }
}