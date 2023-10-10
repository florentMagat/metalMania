import { React, useState, createContext } from "react";

export const Albums = createContext();

export const AlbumsProvider = props => {
    const [albums, setAlbums] = useState([]);

    const addAlbums = (album) => {
        setAlbums([...album, album])
    }

    return (
        <Albums.Provider value={{ albums, setAlbums, addAlbums }}>
            {props.children}
        </Albums.Provider>
    )
}