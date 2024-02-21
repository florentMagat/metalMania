import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FindOneUser from '../Apis/FindOneUser';
import setUpdateUser from '../Apis/UpdateUser';
import "./Dashboard.css";
import { toast } from 'react-toastify';
import 'iconify-icon';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  let jwtCookie = document.cookie.split(";").find(row => row.startsWith('jwt='));
  let token = jwtCookie ? jwtCookie.split('=')[1] : undefined;
  let id = sessionStorage.getItem('id');
  
  useEffect(() => {  
    if (id === "" || id === null || id === undefined) {
      return
    } else {
      async function fetchData() {
          try {
              const api = FindOneUser();
              const res = await api.get(`/${id}`);
              setUser(res.data.data.user) 
              setFirstname(res.data.data.user.firstname);
              setLastname(res.data.data.user.lastname);
              setEmail(res.data.data.user.email);
              setPassword(res.data.data.user.password);
          } catch (err) {
              console.log(err);
          }
      } fetchData()}
  }, [id]); 

  useEffect(()=>{
    let email=sessionStorage.getItem('email');
    let role=sessionStorage.getItem('role');
    if ((email==="" || email === null) && role !== "1"){
    navigate("/login")
    };  
  });

  const handleClick = () => {
    navigate("/")
  }

  const handleDelete = (user) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
    fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
      headers: {"content-type" : "application/json",
      authorization: `Bearer ${token}`,},
      body: JSON.stringify({id: id})})
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.text().then(text => text ? JSON.parse(text) : {})
      })
      .then((data) => {
        if (data.status === "success") {
          toast.success('Votre compte est supprimé !');
          navigate("/login")       
      }})
      .catch((err) => {
        toast.error('Erreur lors de la suppression de l\'utilisateur');
        console.error('Erreur lors de la conversion de la réponse en JSON', err);
      })
    }
  }

  const handleModify = () => {
    setRegister(true);
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setRegister(false);
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    const isPasswordValid = passwordRegex.test(password);
    const isEmailValid = emailRegex.test(email);
  
    if (!isPasswordValid) {
      toast.info("Le mot de passe est invalide. Il doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      return;
    }
  
    if (!isEmailValid) {
      toast.info("L'adresse e-mail est invalide. Veuillez entrer une adresse e-mail valide.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      return;
    }

    const api = setUpdateUser();
    await api.put(`/${id}`, {
      firstname,
      lastname,
      email,
      password,
    })
    navigate('/');
    toast.success('Mise à jour effectuée !');
  }

  console.log(user)

  return (
    <div className='background'>
      <div className='dashboard'>
        <h1 className='users-title'>Mon Compte</h1>
        <table className='users-table'>
          <tbody>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Mot de passe</th>
            </tr>
            <tr key={user.id} style={{fontStyle: "italic"}}>
              {register ?
              <>
                <td><input placeholder={lastname} onChange={e => setLastname(e.target.value)}></input></td>
                <td><input placeholder={firstname} onChange={e => setFirstname(e.target.value)}></input></td>
                <td><input placeholder={email} onChange={e => setEmail(e.target.value)}></input></td>
                <td><input type="password" placeholder="************" onChange={e => setPassword(e.target.value)}></input></td>
              </>
              : 
              <>
                <td>{user.lastname}</td>
                <td>{user.firstname}</td>
                <td>{user.email}</td>
                <td>************</td>
              </>
              }
            </tr>
          </tbody>
        </table>   
        <div style= {{display: "flex", flexDirection: "column", justifyContent: "baseline", alignItems: "center", marginTop: "5vh"}}>
          <div className='userdashboard-table'>
            {register ? <h3 style={{fontSize: "1.25rem"}}>Enregistrer les modifications</h3> : <h3 style={{fontSize: "1.25rem"}}>Modifier des informations</h3>}
            {register ?
              <p onClick={handleUpdate}><iconify-icon icon="fluent:save-28-filled" width="1.5em" height="1.5em"></iconify-icon></p> : 
              <p onClick={handleModify}><iconify-icon icon="fa6-solid:pen" width="1.2em" height="1em"></iconify-icon></p>
            }
          </div>
          <div className='userdashboard-table'>
            <h3 style={{fontSize: "1.25rem"}}>Supprimer mon compte</h3>
            <p onClick={()=> handleDelete(user)}><iconify-icon icon="emojione-v1:cross-mark" width="1.3em" height="1.3em"></iconify-icon></p>
          </div>
        </div>     
      </div>
      <button onClick={handleClick} className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white", marginTop: "5vh"}} >Retour à l'accueil</button>
    </div>
  )
}

export default UserDashboard;