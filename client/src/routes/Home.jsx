import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import AlbumsList from '../components/AlbumsList';
import { useNavigate } from 'react-router-dom';
export const GenreContext = React.createContext();

const Home = () => {
  const navigate = useNavigate();
  const [genre, setGenre] = useState("");

  useEffect(()=>{
    let email=sessionStorage.getItem('email');
    if(email==="" || email === null)
    navigate("/login")
  });

  return (
    <div>
        <GenreContext.Provider value={{ genre, setGenre }}>
          <Header />    
          <AlbumsList />
        </GenreContext.Provider>
    </div>
  )
}

export default Home;