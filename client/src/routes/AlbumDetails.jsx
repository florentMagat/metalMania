import { useState, useEffect } from 'react';
import 'iconify-icon';
import './AlbumDetails.css';
import FindOneAlbum from '../Apis/FindOneAlbum';
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
            const res = await FindOneAlbum.get(`/${id.id}`);
            setAlbum(res.data.data.album) 
            const review = await FindOneReview.get(`/${id.id}`);
            setReview(review.data.data.review);
        } catch (err) {}
    } fetchData()
    }, [id.id]); 

  const handleClick = () => {
    navigate("/")
  }

  const picture = `http://localhost:3001/images/${album.picture}`;

  return (
    // <div className='album-details-container'>
    //   <div className='presentation'>
    //     {album.picture && <img crossorigin='anonymous' src={picture} alt="picture_cover" className='picture' />} 
    //     <div className='title'>
    //       <h1>{album.title} ({album.year})</h1>
    //       <h2>de {album.band}</h2>
    //       <h3>style : {album.genre}</h3>
    //       <button onClick={handleClick} className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white", marginTop: "5vh"}} >Retour à l'accueil</button>
    //     </div>
    //   </div>
    //   <div className='description'>
    //     <div className='album-details-left'>
    //       <iframe width="560" height="315" src="https://www.youtube.com/embed/MMMZdDoDKcg?si=rsb3lw8pxYceoXei" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    //       <div style={{display: "flex", flexDirection: "column", gap: "2vh"}}> 
    //         <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "baseline", gap: "0.5vw"}}>
    //           {review ? {review} + " / 10" : "- / 10"} 
    //           <iconify-icon icon="fluent-emoji-flat:star"></iconify-icon>
    //         </div> 
    //         <button className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}}>Noter</button>
    //       </div>
    //     </div>
    //     <div className='album-details-right'>
    //       <p className='album-details-p'>{album.description}</p>
    //     </div>
    //   </div>
    // </div>
    <div className='album-details-container'>
      <div className='album-details-left'>
      {album.picture && <img crossorigin='anonymous' src={picture} alt="picture_cover" className='picture' />} 
        <iframe width="560" height="315" src="https://www.youtube.com/embed/MMMZdDoDKcg?si=rsb3lw8pxYceoXei" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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