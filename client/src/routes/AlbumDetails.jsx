import { useState, useEffect } from 'react';
import './AlbumDetails.css';
import FindOneAlbum from '../Apis/FindOneAlbum';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const AlbumDetails = () => {

  const [album, setAlbum] = useState("");
  const navigate = useNavigate();
  const id = useParams();

  useEffect(() => {       
    async function fetchData() {
        try {
            const res = await FindOneAlbum.get(`/${id.id}`)
            setAlbum(res.data.data.album)         
        } catch (err) {}
    } fetchData()
    }); 

  const handleClick = () => {
    navigate("/")
  }

  const picture = `http://localhost:3001/images/${album.title}.jpg`;

  return (
    <div className='album-details-container'>
      <div className='album-details-left'>
        <img src={picture} alt="picture_cover" />
      </div>
      <div className='album-details-right'>
        <div>
        <h1>{album.title} ({album.year})</h1>
        <h2>{album.band} / {album.genre}</h2>
        </div>
        <p className='album-details-p'>{album.description}</p>
        <button onClick={handleClick} className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}} >Retour à l'accueil</button>
      </div>
    </div>
  )
}

export default AlbumDetails;