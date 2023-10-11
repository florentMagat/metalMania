import React, { useState } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import '../components/Album.css';

const UpdatePage = (props) => {

  const [title, setTitle] = useState("");
  const [band, setBand] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();

  return (
    <div>
      <>
        <Header />
        <div className='add-album'>
            <form className='form'>
                <div>
                    <h2 className='form-title'>Modifier un album :</h2>
                    <div>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder={title}/>
                    </div>
                    <div>
                        <input type="text" value={band} onChange={e => setBand(e.target.value)} placeholder={band} />
                    </div>
                    <div>
                        <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder={year} />
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
                        <input type = "image" value={picture} onChange={e => setPicture(e.target.value)} alt="Image de présentation de l'album" placeholder={picture} />
                    </div>
                    <div>
                        <textarea type = "text-area" value={description} onChange={e => setDescription(e.target.value)} placeholder={description} />
                    </div>
                    <button type="submit">Valider</button>
                </div>
            </form>
        </div>
    </>
    </div>
  )
}

export default UpdatePage;