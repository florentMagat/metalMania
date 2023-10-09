import { React, useEffect } from 'react';
import Album from './Album';
import AlbumFinder from "../Apis/AlbumFinder";
import { useContext } from 'react';
import { Albums } from '../Context/Albums';
import "./Album.css";

export default function AlbumsList(props) {

    const { albums, setAlbums } = useContext(Albums);

    useEffect(() => {       
        async function fetchData() {
            try {
                const res = await AlbumFinder.get("/")
                setAlbums(res.data.data.album)         
            } catch (err) {}
        } fetchData()
        } ,[]);

        console.log(albums)

    return (
        <div className="album">
            {albums && albums.map(album =>{
                return(
                    <Album {...album} />
                )
            })        
            }
        </div>
    )
}