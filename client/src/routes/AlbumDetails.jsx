import { useState, useEffect } from 'react';
import './AlbumDetails.css';
import FindOneAlbum from '../Apis/FindOneAlbum';
import { useParams } from 'react-router-dom';

const AlbumDetails = () => {

  const [album, setAlbum] = useState("");
  const id = useParams();

  useEffect(() => {       
    async function fetchData() {
        try {
            const res = await FindOneAlbum.get(`/${id.id}`)
            setAlbum(res.data.data.album)         
        } catch (err) {}
    } fetchData()
    }); 

  const picture = `http://localhost:3001/images/${album.title}.jpg`;
  console.log(album)

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
      </div>
    </div>
  )
}

export default AlbumDetails;