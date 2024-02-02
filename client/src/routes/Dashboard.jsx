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

  console.log("users", users);

  return (
    <div className='background'>
        <div className='dashboard'>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Rôle</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.lastname}</td>
                            <td>{user.firstname}</td>
                            <td>{user.email}</td>
                            <td>{user.role_id === 1 ? "administrateur" : "utilisateur"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Dashboard;