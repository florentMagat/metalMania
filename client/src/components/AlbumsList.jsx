import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Album from './Album';
import AlbumFinder from "../Apis/AlbumFinder";
import { useContext } from 'react';
import { Albums } from '../Context/Albums';
import "./Album.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { GenreContext } from '../routes/Home';

export default function AlbumsList() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const { albums, setAlbums } = useContext(Albums);
    const { genre } = useContext(GenreContext);
    let email = sessionStorage.getItem('email');
    let token = localStorage.getItem('jwt');
    let role = sessionStorage.getItem('role');

    useEffect(() => {       
        async function fetchData() {
            try {
                const res = await AlbumFinder.get(`/`)
                setAlbums(res.data.data.album)         
            } catch (err) {}
        } fetchData()
        } ,[]); 
        
    const handleDelete = async (id, picture) => {
        const formData = new FormData();
        formData.append('picture', picture);  
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet album ?')) {
            try {
                if (picture) {  
                await axios.request({
                    method: 'delete',
                    url: `http://localhost:3001/deleteImage`,
                    data: { picture: picture },
                    headers: {
                        "content-type" : "application/json",
                        authorization: `Bearer ${token}`,
                      },
                });
                }
                await AlbumFinder.delete(`/${id}`);
                setAlbums(albums.filter(album => {
                    return album.id !== id
                }))
                toast.success('Album supprimé !');
            } catch (err) {
                console.log(err);
                toast.error('Erreur lors de la suppression de l\'album');
            }
        }
    };

    const handleUpdate = (id) => {
        navigate(`/albums/${id}/update`)
    }

    if (email && role === "1") {
        return (
            <div className='container'>
                <input type="search" className='searchBar' placeholder="rechercher un album ou un groupe" onChange={(e)=>setSearch(e.target.value)}></input>
                <div className="album">
                    {albums && albums.map(album => {
                        if (search.length > 0) {
                            if (album.title.toLowerCase().includes(search.toLowerCase()) || album.band.toLowerCase().includes(search.toLowerCase())){ 
                                return(
                                    <div className='album-presentation'>
                                        <Album key={album.id} { ...album }  />
                                        <div className='album-buttons'>
                                            <button onClick={()=> handleUpdate(album.id)} className="btn" style={{backgroundColor: "#F8C64B", color: "black"}}>Modifier</button>
                                            <button onClick={()=> handleDelete(album.id, album.picture)} className="btn" style={{backgroundColor: "#E71619", color: "black"}}>Supprimer</button>
                                        </div>
                                    </div>
                                )} else {
                                    return null;
                                }
                        } else {
                            if (genre === album.genre) {
                                return(
                                    <div className='album-presentation'>
                                        <Album key={album.id} { ...album }  />
                                        <div className='album-buttons'>
                                            <button onClick={()=> handleUpdate(album.id)} className="btn" style={{backgroundColor: "#F8C64B", color: "black"}}>Modifier</button>
                                            <button onClick={()=> handleDelete(album.id, album.picture)} className="btn" style={{backgroundColor: "#E71619", color: "black"}}>Supprimer</button>
                                        </div>
                                    </div>
                                )
                            } else if (genre === "") {
                                return(
                                    <div className='album-presentation'>
                                        <Album key={album.id} { ...album }  />
                                        <div className='album-buttons'>
                                            <button onClick={()=> handleUpdate(album.id)} className="btn" style={{backgroundColor: "#F8C64B", color: "black"}}>Modifier</button>
                                            <button onClick={()=> handleDelete(album.id, album.picture)} className="btn" style={{backgroundColor: "#E71619", color: "black"}}>Supprimer</button>
                                        </div>
                                    </div>
                                )}}
                        return null;
                    })        
                    }
                </div>
            </div>
        )} else {
            return (
                <div className='container'>
                <input type="search" className='searchBar' placeholder="rechercher un album ou un groupe" onChange={(e)=>setSearch(e.target.value)}></input>
                <div className="album">
                    {albums && albums.map(album => {
                        if (search.length > 0) {
                            if (album.title.toLowerCase().includes(search.toLowerCase()) || album.band.toLowerCase().includes(search.toLowerCase())){ 
                                return(
                                    <div className='album-presentation'>
                                        <Album key={album.id} { ...album }  />
                                    </div>
                                )} else {
                                    return null;
                                }
                        } else {
                            if (genre === album.genre) {
                                return(
                                    <div className='album-presentation'>
                                        <Album key={album.id} { ...album }  />
                                    </div>
                                )
                            } else if (genre === "") {
                                return(
                                    <div className='album-presentation'>
                                        <Album key={album.id} { ...album }  />
                                    </div>
                                )}}
                        return null;
                    })        
                    }
                </div>
            </div>
    )}
};