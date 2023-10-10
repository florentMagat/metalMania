import React from 'react';
import "./Header.css";
import home from '../assets/home.jpg';

export default function Header() {
  return (
    <>
      <div className='header'>
        <img src={home} class="header-img" alt="logo-MetalMania"/>

        <div className='header-categories'>

        </div>

        <div className='header-connection'>
          <div className='header-connection-inputs'>
            <input placeholder='login'></input>
            <input placeholder='mot de passe'></input>
          </div>
          <div className='header-connection-buttons'>
            <button>S'inscrire</button>
            <button>Se connecter</button>
          </div>
        </div>
      </div> 

      <div className='header-bottom'></div>
    </>
  )
}