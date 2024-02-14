import { useNavigate } from 'react-router-dom';
import "./Album.css";

export default function Album( props ) {

  const navigate = useNavigate();
  const handleDetails = (id) => {
    navigate(`/albums/${id}`)
  }
  const picture = `http://localhost:3001/images/${props.picture}`;

  return (
    <>
    <div>
      <div className="album-details" onClick={ () => handleDetails(props.id) }>
      <img crossOrigin='anonymous' src={picture} alt="album_cover" className='image'/>
      </div>
      <div className='album-title'>
        <h3 className='title'>"{props.title}"</h3>
        <h4>{props.band}</h4>
      </div>
    </div>
    </>
  )
};