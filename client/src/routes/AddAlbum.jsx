import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlbumFinder from '../Apis/AlbumFinder';
import "../components/Album.css";
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
  const [video, setVideo] = useState("");
  const [file, setFile] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isUploaded) {
        const confirm = window.confirm("Vous n'avez pas ajouté d'image, voulez-vous continuer ?");
        if (!confirm) {
          return;
        }
    }
    try {
        const res = await AlbumFinder.post("/add", {
            title,
            band,
            year,
            genre,
            picture,
            description,
            video
        })      
        toast.success('Nouvel album ajouté avec succès !');
        navigate('/');
        addAlbums(res.data.data.album);
    } catch (err) {
        console.log(err)
    }
  }

  useEffect(() => {
    console.log("file", file?.name)
    setPicture(file?.name)
  }, [file]);

  const upload = () => {
    console.log("file", file)
    const formData = new FormData()
    formData.append('file', file)
    axios.post('http://localhost:3001/upload', formData)
        .then(res => {
            console.log(res.data.data.filename)
            toast.success("Ajout d'une image réussi !");
            setIsUploaded(true);
        })  
        .catch(er => console.log(er))
        console.log(file)
  }

  const handleClick = () => {
    navigate("/")
  }

  return (
    <>
        <div className='album'>
            <form>
                <div>
                    <h2 className='form-title'>Ajouter un album :</h2>
                    <div className='form-div'>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title" />
                    </div>
                    <div className='form-div'>
                        <input type="text" value={band} onChange={e => setBand(e.target.value)} placeholder="band" />
                    </div>
                    <div className='form-div'>
                        <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder="year" />
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
                    {/* <div>
                        <input type = "image" value={picture} onChange={e => setPicture(e.target.value)} alt="Image de présentation de l'album" placeholder="image" />
                    </div> */}
                    <div className='form-div' style ={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <input type="file" onChange={(e)=> setFile(e.target.files[0])}/>
                        <button type="button" style={{backgroundColor: "black", color: "white", border: "solid 1px white", padding: "1vh", borderRadius: "10px"}} onClick={upload}>Upload</button>
                    </div>
                    <div className='form-div'>
                        <textarea type = "text-area" style={{textAlign: "center", borderRadius: "10px"}} value={description} onChange={e => setDescription(e.target.value)} placeholder="description" />
                    </div>
                    <div className='form-div'>
                        <input type = "text" style={{textAlign: "center", borderRadius: "10px", width: "100%"}} value={video} onChange={e => setVideo(e.target.value)} placeholder="lien vers la vidéo" />
                    </div>
                    <div style={{display: "flex", flexDirection: "row", gap: "2vw", justifyContent: "center"}}>
                        <button onClick={handleSubmit} type="submit" style={{backgroundColor: "black", color: "white", border: "solid 1px white", padding: "1vh", borderRadius: "10px", marginTop: "2vh"}}>Valider</button>
                        <button onClick={handleClick} style={{backgroundColor: "black", color: "white", border: "solid 1px white", padding: "1vh", borderRadius: "10px", marginTop: "2vh"}}>Retour à l'accueil</button>
                    </div>
                </div>        
            </form> 
        </div>   
    </>
  )
}