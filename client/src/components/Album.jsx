import React from 'react';
import "./Album.css";
import AlbumDetails from '../routes/AlbumDetails';

export default function Album( props ) {

  return (
    <div>
      <div className="album-details" onClick={ () => <AlbumDetails {...props}/>}>
        <div>{props.picture}</div>
      </div>
      <h2>"{props.title}"</h2>
      <h3>{props.band}</h3>

    </div>
  )
}