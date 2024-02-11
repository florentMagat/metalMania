import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import home from '../assets/home-V2.jpg';

export default function Login() {

  const [email, emailupdate] = useState("");
  const [password, passwordupdate] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
    sessionStorage.clear();
  },[]);

  // const validate = () => {
  //   let result = true;
  //   if(email === "" || email === null){
  //     result = false;
  //     toast.warning("Entrez votre email")
  //   }
  //   if(password === "" || password === null){
  //     result = false;
  //     toast.warning("Entrez votre mot de passe")
  //   }
  //   return result;
  // }

    const ProceedLogin = (e) => {
      e.preventDefault();
      let informations = { email, password }
  
      fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {"content-type" : "application/json"},
        body:JSON.stringify(informations)

      }).then((res)=>{
        res.json().then((data) => {
          // toast.success('Login réussi');
          console.log("IMP", data.token);
          setIsLogged(true);
          localStorage.setItem('jwt', data.token);
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('role', data.data.role);
          navigate("/");
      })}).catch((err)=>{
        toast.error('erreur')
      });
    }

    const handleRegister = () => {
      navigate('/register')
    }

  if (isLogged) {
      navigate('/')
  } else {
  return (
    <>
      <div className="login">   
        <form onSubmit={ProceedLogin}>
          <img src={home} className="login-img" alt="logo-MetalMania" style={{borderRadius: "35px", height: "30vh", width: "auto"}} onClick={()=>navigate(`/`)}/>
          <div className="form-outline mt-4 mb-4">
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
              <label className="form-label" for="form3Example3">Email</label>
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
              <input type="email" style={{width: '25vw', textAlign: "center"}} value={email} onChange={e=>emailupdate(e.target.value)} id="form3Example3" className="form-control" /> 
            </div>
          </div>

          <div className="form-outline mb-4">
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
              <label className="form-label" for="form3Example4">Password</label>
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
              <input type="password" style={{width: '25vw', textAlign: "center"}} value={password} onChange={e=>passwordupdate(e.target.value)} id="form3Example4" className="form-control" />  
            </div>
          </div>

          <div className="login-buttons">
            <button type="submit" className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}}>Se connecter</button>
            <button onClick={handleRegister} className="btn" style={{backgroundColor: "black", color: "white", border: "solid 1px white"}} >S'inscrire</button>
          </div>

        </form>
      </div>
    </>
  )
}}