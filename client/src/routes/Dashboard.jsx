import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css";
import { toast } from 'react-toastify';

const Dashboard = () => {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(()=> {
    fetch("http://localhost:3001/users", {
      method: "GET",
      headers: {"content-type" : "application/json"},
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

  return (
    <div className='background'>
        <div className='dashboard'>
            <h1 className='users-title'>Gestion des utilisateurs</h1>
            <table className='users-table'>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.lastname}</td>
                        <td>{user.firstname}</td>
                        <td>{user.email}</td>
                        <td>{user.role_id === 1 ? "administrateur" : "utilisateur"}</td>
                        <td></td>
                        <td></td>
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
