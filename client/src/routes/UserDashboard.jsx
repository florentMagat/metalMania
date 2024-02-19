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
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailRegex.test(email);
  
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

    // let informations = { firstname, lastname, email, password};

    // fetch(`http://localhost:3001/update/${id}`, {
    //   method: "PUT",
    //   headers: {"content-type" : "application/json",
    //   authorization: `Bearer ${token}`},
    //   body:JSON.stringify(informations)
    // }).then((res)=>{
    //   toast.success("Modifications enregistrées !");
    //   navigate("/login");
    // }).catch((err)=>{
    //   toast.error("erreur")
    // });

    console.log("firstname", firstname)
    console.log("lastname", lastname)
    console.log("email", email)

    const api = setUpdateUser();
    await api.put(`/${id}`, {
      firstname,
      lastname,
      email,
    })
    navigate('/');
    toast.success('Mise à jour effectuée !');
  }

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
                  {register ? <th>Enregistrer</th> : <th>Modifier</th>}
                  <th>Supprimer</th>
                </tr>
                <tr key={user.id}>
                  {register ?
                  <>
                    <td><input placeholder={lastname} onChange={e => setLastname(e.target.value)}></input></td>
                    <td><input placeholder={firstname} onChange={e => setFirstname(e.target.value)}></input></td>
                    <td><input placeholder={email} onChange={e => setEmail(e.target.value)}></input></td>
                  </>
                  : 
                  <>
                    <td>{user.lastname}</td>
                    <td>{user.firstname}</td>
                    <td>{user.email}</td>
                  </>
                  }
                  {register ?
                    <td onClick={handleUpdate}><iconify-icon icon="fluent:save-28-filled" width="2em" height="2em"></iconify-icon></td> : 
                    <td onClick={handleModify}><iconify-icon icon="fa6-solid:pen" width="1.2em" height="1.2em"></iconify-icon></td>
                  }
                  <td onClick={()=> handleDelete(user)}><iconify-icon icon="emojione-v1:cross-mark" width="1.3em" height="1.3em"></iconify-icon></td>
                </tr>
              </tbody>
            </table>   
        </div>
      <button onClick={handleClick} className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white", marginTop: "5vh"}} >Retour à l'accueil</button>
    </div>
  )
}

export default UserDashboard;