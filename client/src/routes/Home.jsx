import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AlbumsList from '../components/AlbumsList';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    let email=sessionStorage.getItem('email');
    if(email==="" || email === null)
    navigate("/login")
  },[]);

  return (
    <div>
        <Header />    
        <Link style={{float:"right"}} to={"/login"}>Logout</Link>  
        <AlbumsList />
    </div>
  )
}

export default Home;