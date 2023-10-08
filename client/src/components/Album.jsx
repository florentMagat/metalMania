import React from 'react'

export default function Album( props ) {
  return (
    <div>
        <h2>{props.title}</h2>
        <h3>{props.band}</h3>
        <p>{props.year}</p>
        <p>{props.genre}</p>
        <p>{props.description}</p>
        <div>{props.picture}</div>
    </div>
  )
}