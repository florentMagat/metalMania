import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Album from './Album';
import setDeleteAlbum from "../Apis/DeleteAlbum";
import { useContext } from 'react';
import { Albums } from '../Context/Albums';
import "./Album.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { GenreContext } from '../routes/Home';
import AlbumsFetch from '../Apis/AlbumsFetch';

export default function AlbumsList() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const { albums, setAlbums } = useContext(Albums);
    const { genre } = useContext(GenreContext);
    let role = sessionStorage.getItem('role');

    // let token = localStorage.getItem('jwt');
    let jwtCookie = document.cookie.split(";").find(row => row.startsWith('jwt='));
    let token = jwtCookie ? jwtCookie.split('=')[1] : undefined;

    useEffect(() => {   
        if (token === null || token === undefined || token === "") {
            return 
        } else {
            async function fetchData() {
                try {
                    const api =  AlbumsFetch();
                    const res = await api.get();
                    setAlbums(res.data.data.album)         
                } catch (err) {
                    console.log(err);
                }
            } fetchData()}
    }, [token, setAlbums]);

    const handleDelete = async (id, picture) => {
        const formData = new FormData();
        formData.append('picture', picture);  
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet album ?')) {
            try {
                let jwtCookie = document.cookie.split(";").find(row => row.startsWith('jwt='));
                let token = jwtCookie ? jwtCookie.split('=')[1] : undefined;
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
                const api = setDeleteAlbum();
                await api.delete(`/${id}`);
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
    };

    if (role === "1") {
        return (
            <div className='container'>
                <input type="search" className='searchBar' placeholder="rechercher un album ou un groupe" onChange={(e)=>setSearch(e.target.value)}></input>
                <div className="album">
                    {albums && albums.map(album => {
                        if (search.length > 0) {
                            if (album.title.toLowerCase().includes(search.toLowerCase()) || album.band.toLowerCase().includes(search.toLowerCase())){ 
                                return(
                                    <div key={album.id} className='album-presentation'>
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
                                    <div key={album.id} className='album-presentation'>
                                        <Album key={album.id} { ...album }  />
                                        <div className='album-buttons'>
                                            <button onClick={()=> handleUpdate(album.id)} className="btn" style={{backgroundColor: "#F8C64B", color: "black"}}>Modifier</button>
                                            <button onClick={()=> handleDelete(album.id, album.picture)} className="btn" style={{backgroundColor: "#E71619", color: "black"}}>Supprimer</button>
                                        </div>
                                    </div>
                                )
                            } else if (genre === "") {
                                return(
                                    <div key={album.id} className='album-presentation'>
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
                                    <div key={album.id} className='album-presentation'>
                                        <Album key={album.id} { ...album }  />
                                    </div>
                                )} else {
                                    return null;
                                }
                        } else {
                            if (genre === album.genre) {
                                return(
                                    <div key={album.id} className='album-presentation'>
                                        <Album key={album.id} { ...album }  />
                                    </div>
                                )
                            } else if (genre === "") {
                                return(
                                    <div key={album.id} className='album-presentation'>
                                        <Album key={album.id} { ...album }  />
                                    </div>
                                )}}
                        return null;
                    })     
                    }
                </div>
            </div>
        )
    }
};