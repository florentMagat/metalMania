import { React, useState, createContext } from "react";

export const Albums = createContext();

export const AlbumsProvider = props => {
    const [albums, setAlbums] = useState([]);

    return (
        <Albums.Provider value={{albums, setAlbums}}>
            {props.children}
        </Albums.Provider>
    )
}