import React from 'react'

export default function AddAlbum() {
  return (
    <div>
        <form>
            <div>
                <div>
                    <input type = "text" placeholder="title" />
                </div>
                <div>
                    <input type = "text" placeholder="band" />
                </div>
                <div>
                    <input type = "number" placeholder="year" />
                </div>
                <div>
                    <select className='custom-select my-1 mr-sm-2'>
                        <option disabled>Genre</option>
                        <option>Death Metal</option>
                        <option>Black Metal</option>
                        <option>Folk Metal</option>
                        <option>Doom Metal</option>
                        <option>Autres</option>
                    </select>
                </div>
                <div>
                    <input type = "image" alt="Image de présentation de l'album" placeholder="image" />
                </div>
                <div>
                    <input type = "text" placeholder="description" />
                </div>
            </div>
        </form>
    </div>
  )
}