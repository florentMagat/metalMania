import { useNavigate } from 'react-router-dom';
import "./Album.css";

export default function Album( props ) {

  const navigate = useNavigate();
  const handleDetails = (id) => {
    navigate(`/albums/${id}`)
  }
  const picture = `http://localhost:3001/images/${props.title}.jpg`

  return (
    <>
    <div>
      <div className="album-details" onClick={ () => handleDetails(props.id) }>
      <img src={picture} alt="album_cover" className='image'/>
      </div>
      <h3>"{props.title}"</h3>
      <h4>{props.band}</h4>
    </div>
    </>
  )
};