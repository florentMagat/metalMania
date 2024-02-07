import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Album from './Album';
import AlbumFinder from "../Apis/AlbumFinder";
import { useContext } from 'react';
import { Albums } from '../Context/Albums';
import "./Album.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { GenreContext } from '../routes/Home';

export default function AlbumsList( ) {
    const navigate = useNavigate();
    const { albums, setAlbums } = useContext(Albums);
    const { genre } = useContext(GenreContext);
    let email = sessionStorage.getItem('email');

    useEffect(() => {       
        async function fetchData() {
            try {
                const res = await AlbumFinder.get(`/`)
                setAlbums(res.data.data.album)         
            } catch (err) {}
        } fetchData()
        } ,[]); 
        
    const handleDelete = async (id, picture) => {
        const formData = new FormData()
        formData.append('picture', picture);

        try {
            await axios.request({
                method: 'delete',
                url: `http://localhost:3001/deleteImage`,
                data: { picture: picture }
            });

            await AlbumFinder.delete(`/${id}`);
            setAlbums(albums.filter(album => {
                return album.id !== id
            }))
            toast.success('Album supprimé !');
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/albums/${id}/update`)
    }

    let role = sessionStorage.getItem('role');

    if (email && role === "1") {
        return (
            <div className="album">
                {albums && albums.map(album => {
                    if (genre === album.genre) {
                        return(
                            <div className='album-presentation'>
                                <Album { ...album }  />
                                <div className='album-buttons'>
                                    <button onClick={()=> handleUpdate(album.id)} className="btn" style={{backgroundColor: "#F8C64B", color: "black"}}>Modifier</button>
                                    <button onClick={()=> handleDelete(album.id, album.picture)} className="btn" style={{backgroundColor: "#E71619", color: "black"}}>Supprimer</button>
                                </div>
                            </div>
                        )
                    } else if (genre === "") {
                        return(
                            <div className='album-presentation'>
                                <Album { ...album }  />
                                <div className='album-buttons'>
                                    <button onClick={()=> handleUpdate(album.id)} className="btn" style={{backgroundColor: "#F8C64B", color: "black"}}>Modifier</button>
                                    <button onClick={()=> handleDelete(album.id, album.picture)} className="btn" style={{backgroundColor: "#E71619", color: "black"}}>Supprimer</button>
                                </div>
                            </div>
                        )
                    }
                    return null;
                })        
                }
            </div>
        )} else {
            return (
                <div className="album">
                    {albums && albums.map(album =>{
                        return(
                            <div className='album-presentation'>
                                <Album { ...album }  />
                            </div>
                        )
                    })        
                    }
                </div>
    )}
};