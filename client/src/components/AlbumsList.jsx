import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Album from './Album';
import AlbumFinder from "../Apis/AlbumFinder";
import { useContext } from 'react';
import { Albums } from '../Context/Albums';
import "./Album.css";
import { toast } from 'react-toastify';

export default function AlbumsList() {
    const navigate = useNavigate();
    const { albums, setAlbums } = useContext(Albums);
    let email=sessionStorage.getItem('email');
    
    useEffect(() => {       
        async function fetchData() {
            try {
                const res = await AlbumFinder.get(`/`)
                setAlbums(res.data.data.album)         
            } catch (err) {}
        } fetchData()
        } ,[]);    
        
    const handleDelete = async (id) => {
        try {
            await AlbumFinder.delete(`/${id}`);
            setAlbums(albums.filter(album => {
                return album.id !== id
            }))
            toast.success('Album supprimé !');
        } catch (err) {}
    };

    const handleUpdate = (id) => {
        navigate(`/albums/${id}/update`)
    }
    let role = sessionStorage.getItem('role');

    if (email && role === "1") {
    return (
        <div className="album">
            {albums && albums.map(album =>{
                return(
                    <div className='album-presentation'>
                        <Album { ...album }  />
                        <div className='album-buttons'>
                            <button onClick={()=> handleUpdate(album.id)} className='btn btn-warning'>Modifier</button>
                            <button onClick={()=> handleDelete(album.id)} className='btn btn-danger'>Supprimer</button>
                        </div>
                    </div>
                )
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