import { useContext, useState } from 'react';
import AlbumFinder from '../Apis/AlbumFinder';
import Header from '../components/Header'
import "./AddAlbum.css";
import { Albums } from '../Context/Albums';

export default function AddAlbum() {

  const { addAlbums } = useContext(Albums)
  const [title, setTitle] = useState("");
  const [band, setBand] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");

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
        addAlbums(res.data.data.album);
        console.log(res);
    } catch (err) {

    }
  }

  return (
    <>
        <Header />
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
                    <div>
                        <input type = "image" value={picture} onChange={e => setPicture(e.target.value)} alt="Image de présentation de l'album" placeholder="image" />
                    </div>
                    <div>
                        <textarea type = "text-area" value={description} onChange={e => setDescription(e.target.value)} placeholder="description" />
                    </div>
                    <button onClick={handleSubmit} type="submit">Valider</button>
                </div>
            </form>
        </div>
    </>
  )
}