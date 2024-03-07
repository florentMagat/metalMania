import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import getFetchFavorites from '../Apis/FetchFavorites';
import "./Favorites.css";

const Favorites = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('id');
  const [albums, setAlbums] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const api = getFetchFavorites();
        const res = await api.get(`/${userId}`);
        console.log("res", res)
        setAlbums(res.data.data.album);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const handleClick = () => {
    navigate("/")
  }

  console.log("userId", userId);

  return (
    <main className="favorites-background">
      <div className='dashboard'>
        <h1 className='favorites-title'>Mes Favoris</h1>
        <Slider {...settings} className="slider-container">
            <div className="slide">
                <h3>1</h3>
            </div>
            <div className="slide">
                <h3>2</h3>
            </div>
            <div className="slide">
                <h3>3</h3>
            </div>
            <div className="slide">
                <h3>4</h3>
            </div>
            <div className="slide">
                <h3>5</h3>
            </div>
            <div className="slide">
                <h3>6</h3>
            </div>
        </Slider>
      </div>
      <button onClick={handleClick} className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white", marginTop: "5vh"}} >Retour à l'accueil</button>
    </main>
  );
}

export default Favorites;