import React from 'react';
import "./Header.css";
import home from '../assets/home.jpg';

export default function Header() {
  return (
    <>
      <img src={home} class="header-img" alt="forêt"/>
      <div class="header-bottom"></div>
    </>
  )
}
