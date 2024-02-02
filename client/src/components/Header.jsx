import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import home from '../assets/home.jpg';

export default function Header( ) {

  const navigate = useNavigate();
  const handleAdding = () => {
    navigate('/albums/add')
  }
  
  const handleSubmit = () => {
    navigate("/login")
  }

  const handleDashboard = () => {
    navigate("/dashboard")
  }

  let email = sessionStorage.getItem('email');
  let role = sessionStorage.getItem('role');

  if (email && role === "1"){
    return (
      <>
        <div className='header'>
          <img src={home} className="header-img" alt="logo-MetalMania" onClick={()=>navigate(`/`)}/>
  
          <div className='header-categories'>
            <button type="button" className="btn btn-secondary">Death Metal</button>
            <button type="button" className="btn btn-danger">Doom Metal</button>
            <button type="button" className="btn btn-warning">Folk Metal</button>
            <button type="button" className="btn btn-dark">Black Metal</button>
            <button type="button" className="btn btn-light">Autres</button>   
            <button type="button" className="btn btn-primary add-button" onClick={handleAdding}>Ajouter un nouvel album</button>   
          </div>
  
          <div className='header-connection'>
            <button onClick={handleSubmit} className="btn btn-primary" >Se déconnecter</button>   
            <button onClick={handleDashboard} className="btn btn-primary" >Dashboard</button>
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
  
          <div className='header-categories'>
            <button type="button" className="btn btn-secondary">Death Metal</button>
            <button type="button" className="btn btn-danger">Doom Metal</button>
            <button type="button" className="btn btn-warning">Folk Metal</button>
            <button type="button" className="btn btn-dark">Black Metal</button>
            <button type="button" className="btn btn-light">Autres</button>     
          </div>
  
          <div className='header-connection'>
            <button onClick={handleSubmit} className="btn btn-primary" >Se déconnecter</button>   
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