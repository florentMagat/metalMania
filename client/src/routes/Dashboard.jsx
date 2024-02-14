import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css";
import { toast } from 'react-toastify';
import 'iconify-icon';

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  let jwtCookie = document.cookie.split(";").find(row => row.startsWith('jwt='));
  let token = jwtCookie ? jwtCookie.split('=')[1] : undefined;

  useEffect(()=> {
    // let token = localStorage.getItem('jwt');
    fetch("http://localhost:3001/users", {
      method: "GET",
      headers: {
        "content-type" : "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res)=>{
      res.json().then((data) => {
        setUsers(data.data.users);
    })}).catch((err)=>{
      toast.error('erreur');
      console.error('Erreur lors de la conversion de la réponse en JSON', err);
    })
  }, []);

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
    console.log("user.id", user.id)
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    fetch(`http://localhost:3001/users/${user.id}`, {
      method: "DELETE",
      headers: {"content-type" : "application/json",
      authorization: `Bearer ${token}`,},
      body: JSON.stringify({id: user.id})})
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
          setUsers(users.filter(selectedUser => {
            return selectedUser.id !== user.id
          }))         
      }})
      .catch((err) => {
        toast.error('Erreur lors de la suppression de l\'utilisateur');
        console.error('Erreur lors de la conversion de la réponse en JSON', err);
      })
      
    }
  }

  return (
    <div className='background'>
        <div className='dashboard'>
            <h1 className='users-title'>Gestion des utilisateurs</h1>
            <table className='users-table'>
              <tbody>
                <tr>
                  {/* <th>ID</th> */}
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  {/* <th>Modifier</th> */}
                  <th>Supprimer</th>
                </tr>
                {users.map((user) => (
                    <tr key={user.id}>
                        {/* <td>{user.id}</td> */}
                        <td>{user.lastname}</td>
                        <td>{user.firstname}</td>
                        <td>{user.email}</td>
                        <td>{user.role_id === 1 ? "administrateur" : "utilisateur"}</td>
                        {/* <td><iconify-icon icon="tabler:dots"></iconify-icon></td> */}
                        {user.role_id === 2 ? <td onClick={()=> handleDelete(user)}><iconify-icon icon="emojione-v1:cross-mark"></iconify-icon></td> : <td></td>}
                    </tr>
                ))}
              </tbody>
            </table>   
        </div>
      <button onClick={handleClick} className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white", marginTop: "5vh"}} >Retour à l'accueil</button>
    </div>
  )
}

export default Dashboard;
