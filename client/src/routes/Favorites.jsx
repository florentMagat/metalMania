import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import getFetchFavorites from '../Apis/FetchFavorites';
import AlbumsFetch from '../Apis/AlbumsFetch';
import Album from '../components/Album';
import "./Favorites.css";

const Favorites = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('id');
  const [albums, setAlbums] = useState([]);
  const [favoritesAlbums, setFavoritesAlbums] = useState([]);

  let jwtCookie = document.cookie.split(";").find(row => row.startsWith('jwt='));
  let token = jwtCookie ? jwtCookie.split('=')[1] : undefined;

  useEffect(() => {   
    if (token === null || token === undefined || token === "") {
      return 
    } else {
      async function fetchData() {
        try {
            const api =  AlbumsFetch();
            const res = await api.get();
            setAlbums(res.data.data.album)         
        } catch (err) {
            console.log(err);
        }
    } fetchData()}
  }, [token]);

  useEffect(() => {
    async function fetchData() {
      try {
        const api = getFetchFavorites();
        const res = await api.get(`/${userId}`);
        console.log("res", res)
        setFavoritesAlbums(res.data.data.favorites);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [userId]);

  const handleClick = () => {
    navigate("/")
  }

  const selectedAlbums = albums.filter(album => 
    favoritesAlbums.some(favoriteAlbum => favoriteAlbum.album_id === album.id)
  );

  const settings = {
    dots: true,
    infinite: selectedAlbums.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  console.log("albums", albums);
  console.log("favoritesAlbums", favoritesAlbums);
  console.log("selectedAlbums", selectedAlbums);

  return (
    <main className="favorites-background">
      <div className='dashboard'>
        <h1 className='favorites-title'>Mes Favoris</h1>
        {selectedAlbums && selectedAlbums.length > 0 ? (
          <Slider {...settings} className="slider-container">
            {selectedAlbums.map((album) => (
              <div key={album.id}>
                <Album key={album.id} { ...album } />
              </div>
            ))}
          </Slider>
        ) : (
          <p>Vous n'avez pas encore de favoris</p>
        )}
      </div>
      <button onClick={handleClick} className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white", marginTop: "5vh"}} >Retour à l'accueil</button>
    </main>
  );
}

export default Favorites;