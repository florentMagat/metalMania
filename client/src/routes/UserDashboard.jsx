import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FindOneUser from '../Apis/FindOneUser';
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

  // let email = (sessionStorage.getItem('email'));
  let id = sessionStorage.getItem('id');
  console.log("id", id)
  
  useEffect(() => {  
    if (id === "" || id === null || id === undefined) {
      return
    } else {
      async function fetchData() {
          try {
              const api = FindOneUser();
              const res = await api.get(`/${id}`);
              setUser(res.data.data.user) 
          } catch (err) {
              console.log(err);
          }
      } fetchData()}
  }, [id]); 

  // useEffect(()=> {
  //   let jwtCookie = document.cookie.split(";").find(row => row.startsWith('jwt='));
  //   let token = jwtCookie ? jwtCookie.split('=')[1] : undefined;
  //   console.log("token", token)
  //   console.log("id", id)

  //   fetch(`http://localhost:3001/users/${id}`, {
  //     method: "GET",
  //     headers: {
  //       "content-type" : "application/json",
  //       authorization: `Bearer ${token}`,
  //       data: { id: id },
  //     },
  //   }).then((res)=>{
  //     res.json().then((data) => {
  //       console.log("data", data)
  //       setUser(data.data.user);
  //       setFirstname(data.data.user.firstname);
  //       setLastname(data.data.user.lastname);
  //       setEmail(data.data.user.email);
  //       setPassword(data.data.user.password);
  //   })}).catch((err)=>{
  //     toast.error('erreur');
  //     console.error('Erreur lors de la conversion de la réponse en JSON', err);
  //   })
  // }, []);

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
      headers: {"content-type" : "application/json"},
      body: JSON.stringify({id: id})})
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.text().then(text => text ? JSON.parse(text) : {})
      })
      .then((data) => {
        console.log("data", data)
        if (data.status === "success") {
          toast.success('Utilisateur supprimé !');
          setUser(user.filter(selectedUser => {
            return selectedUser.id !== user.id
          }))         
      }})
      .catch((err) => {
        toast.error('Erreur lors de la suppression de l\'utilisateur');
        console.error('Erreur lors de la conversion de la réponse en JSON', err);
      })
    }
  }

  // const handleUpdate = (e) => {
  //   e.preventDefault();
    
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
  //   const isPasswordValid = passwordRegex.test(password);
  //   const isEmailValid = emailRegex.test(email);
  
  //   if (!isPasswordValid) {
  //     toast.info("Le mot de passe est invalide. Il doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //       });
  //     return;
  //   }
  
  //   if (!isEmailValid) {
  //     toast.info("L'adresse e-mail est invalide. Veuillez entrer une adresse e-mail valide.", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //       });
  //     return;
  //   }

  //   let informations = { firstname, lastname, email, password, role_id };

  //   fetch(`http://localhost:3001/update/${id}`, {
  //     method: "POST",
  //     headers: {"content-type" : "application/json",
  //     authorization: `Bearer ${token}`},
  //     body:JSON.stringify(informations)
  //   }).then((res)=>{
  //     toast.success("Enregistrement réussi");
  //     navigate("/login");
  //   }).catch((err)=>{
  //     toast.error("erreur")
  //   });
  // }

  console.log("user", user)

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
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
                <tr key={user.id}>
                  <td>{user.lastname}</td>
                  <td>{user.firstname}</td>
                  <td>{user.email}</td>
                  <td><iconify-icon icon="tabler:dots"></iconify-icon></td>
                  <td onClick={()=> handleDelete(user)}><iconify-icon icon="emojione-v1:cross-mark"></iconify-icon></td>
                </tr>
              </tbody>
            </table>   
        </div>
      <button onClick={handleClick} className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white", marginTop: "5vh"}} >Retour à l'accueil</button>
    </div>
  )
}

export default UserDashboard;