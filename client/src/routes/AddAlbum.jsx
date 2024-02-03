import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlbumFinder from '../Apis/AlbumFinder';
import "./AddAlbum.css";
import { Albums } from '../Context/Albums';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddAlbum() {

  const navigate = useNavigate();

  const { addAlbums } = useContext(Albums)
  const [title, setTitle] = useState("");
  const [band, setBand] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");

  const [file, setFile] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await AlbumFinder.post("/add", {
            title,
            band,
            year,
            genre,
            picture,
            description,
        })
        console.log("addalbum", res.data.data.album)
        
        toast.success('Nouvel album ajouté avec succès !');
        navigate('/');
        addAlbums(res.data.data.album);
    } catch (err) {
        console.log(err)
    }
  }

  const upload = () => {
    const formData = new FormData()
    formData.append('file', file)
    axios.post('http://localhost:3001/upload', formData)
        .then(res => {
        })  
        .catch(er => console.log(er))
        console.log(file)
  }

  const handleClick = () => {
    navigate("/")
  }

  return (
    <>
        <div className='add-album'>
            <form className='form'>
                <div>
                    <h2 className='form-title'>Ajouter un album :</h2>
                    <div>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title" />
                    </div>
                    <div>
                        <input type="text" value={band} onChange={e => setBand(e.target.value)} placeholder="band" />
                    </div>
                    <div>
                        <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="year" />
                    </div>
                    <div>
                        <select className='custom-select my-1 mr-sm-2' value={genre} onChange={e => setGenre(e.target.value)}>
                            <option disabled>Genre</option>
                            <option>Death Metal</option>
                            <option>Black Metal</option>
                            <option>Folk Metal</option>
                            <option>Doom Metal</option>
                            <option>Autres</option>
                        </select>
                    </div>
                    {/* <div>
                        <input type = "image" value={picture} onChange={e => setPicture(e.target.value)} alt="Image de présentation de l'album" placeholder="image" />
                    </div> */}
                    <div>
                        <input type="file" onChange={(e)=> setFile(e.target.files[0])}/>
                        <p>{picture}</p>
                        <button type="button" onClick={upload}>Upload</button>
                    </div>
                    <div>
                        <textarea type = "text-area" value={description} onChange={e => setDescription(e.target.value)} placeholder="description" />
                    </div>
                    <button onClick={handleSubmit} type="submit">Valider</button>
                </div>
                
            </form>    
        </div>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", paddingTop: "5vh"}}>
            <button onClick={handleClick} className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}}>Retour à l'accueil</button>
        </div>
    </>
  )
}