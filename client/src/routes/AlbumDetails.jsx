import { useState, useEffect } from 'react';
import 'iconify-icon';
import './AlbumDetails.css';
import AlbumsFetch from '../Apis/AlbumsFetch';
import FindOneReview from '../Apis/FindOneReview';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const AlbumDetails = () => {

  const [album, setAlbum] = useState("");
  const [review, setReview] = useState("");
  const navigate = useNavigate();
  const id = useParams();

  useEffect(() => {       
    async function fetchData() {
        try {
            const api = AlbumsFetch();
            const res = await api.get(`/${id.id}`);           
            setAlbum(res.data.data.album) 

            const reviewApi = FindOneReview();
            const review = await reviewApi.get(`/${id.id}`);
            setReview(review.data.data.review);
        } catch (err) {}
    } fetchData()
    }, [id.id]); 

  const handleClick = () => {
    navigate("/")
  }

  const picture = `http://localhost:3001/images/${album.picture}`;

  return (
    <div className='album-details-container'>
      <div className='album-details-left'>
      {album.picture && <img crossOrigin='anonymous' src={picture} alt="picture_cover" className='picture' />} 
        <iframe 
          width="560" 
          height="315" 
          src={album.video} 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen>
        </iframe>
        <div style={{display: "flex", flexDirection: "row", gap: "2vh", alignItems: "baseline"}}> 
          <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "baseline", gap: "0.5vw"}}>
            {review ? {review} + " / 10" : "- / 10"} 
            <iconify-icon icon="fluent-emoji-flat:star"></iconify-icon>
          </div> 
          <button className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}}>Noter</button>
        </div>
      </div>
      <div className='album-details-right'>
      <div className='title'>
          <h1>{album.title} ({album.year})</h1>
          <h2>de {album.band}</h2>
          <h3>style : {album.genre}</h3>
          <button onClick={handleClick} className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white", marginTop: "5vh"}} >Retour à l'accueil</button>
        </div>
        <p className='album-details-p'>{album.description}</p>
      </div>
    </div>
  )
}

export default AlbumDetails;