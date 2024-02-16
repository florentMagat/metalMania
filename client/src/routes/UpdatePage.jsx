import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import '../components/Album.css';
import getFindOneAlbum from '../Apis/FindOneAlbum';
import { toast } from 'react-toastify';
import axios from 'axios';
import setUpdateAlbum from '../Apis/UpdateAlbum';

const UpdatePage = (props) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [band, setBand] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [file, setFile] = useState("");

  useEffect(()=> {
    const fetchData = async() => {
      const api = getFindOneAlbum();
      const res = await api.get(`/${id}`)
      const resp = res.data.data.album
        setTitle(resp.title)
        setBand(resp.band)
        setYear(resp.year)
        setGenre(resp.genre)
        setPicture(resp.picture)
        setDescription(resp.description)
        setVideo(resp.video)
    }
    fetchData()
  }, []);

  useEffect(() => {
    console.log("file", file?.name)
    setPicture(file?.name)
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const api = getFindOneAlbum();
    const res = await api.put(`/${id}`, {
      title,
      band,
      year,
      genre,
      picture,
      description,
      video
    })
    navigate('/');
    toast.success('Mise à jour effectuée !');
  }

  const handleClick = () => {
    navigate("/")
  }

  const upload = () => {
    const formData = new FormData()
    formData.append('file', file)
    axios.post('http://localhost:3001/upload', formData)
      .then(res => {
          axios.put('http://localhost:3001/updateImage', { imageUrl: res.data.pathname })
              .then(res => {
                  console.log(res)
                  toast.success("Modification d'une image réussie !");
              })
              .catch(err => console.log(err))
      })  
      .catch(er => console.log(er))
      console.log(file)
  }

  return (
    <div>
      <>
        <div className='album'>
            <form>
                <div>
                    <h2 className='form-title'>Modifier un album :</h2>
                    <div className='form-div'>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder={title}/>
                    </div>
                    <div className='form-div'>
                        <input type="text" value={band} onChange={e => setBand(e.target.value)} placeholder={band} />
                    </div>
                    <div className='form-div'>
                        <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder={year} />
                    </div>
                    <div className='form-div'>
                        <select className='custom-select my-1 mr-sm-2' style={{backgroundColor: "black", color: "white", border: "solid 1px white", padding: "1vh", borderRadius: "10px"}} value={genre} onChange={e => setGenre(e.target.value)}>
                            <option disabled>Genre</option>
                            <option>Death Metal</option>
                            <option>Black Metal</option>
                            <option>Folk Metal</option>
                            <option>Doom Metal</option>
                            <option>Autres</option>
                        </select>
                    </div>
                    <div className='form-div' style ={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <input type="file" onChange={(e)=> setFile(e.target.files[0])}/>
                        <button type="button" style={{backgroundColor: "black", color: "white", border: "solid 1px white", padding: "1vh", borderRadius: "10px"}} onClick={upload}>Upload</button>
                    </div>
                    <div className='form-div'>
                        <textarea type = "text-area" style={{textAlign: "center", borderRadius: "10px"}} value={description} onChange={e => setDescription(e.target.value)} placeholder={description} />
                    </div>
                    <div className='form-div'>
                        <input type = "text" style={{textAlign: "center", borderRadius: "10px", width: "100%"}} value={video} onChange={e => setVideo(e.target.value)} placeholder={video} />
                    </div>
                    <div style={{display: "flex", flexDirection: "row", gap: "2vw", justifyContent: "center"}}>
                        <button onClick={handleSubmit} type="submit" style={{backgroundColor: "black", color: "white", border: "solid 1px white", padding: "1vh", borderRadius: "10px", marginTop: "2vh"}}>Modifier</button>
                        <button onClick={handleClick} style={{backgroundColor: "black", color: "white", border: "solid 1px white", padding: "1vh", borderRadius: "10px", marginTop: "2vh"}}>Retour à l'accueil</button>
                    </div>
                </div>
            </form>
        </div>
    </>
    </div>
  )
}

export default UpdatePage;