import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import home from '../assets/home.jpg';

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
      console.log(informations);
      console.log("email", email)
  
      fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {"content-type" : "application/json"},
        body:JSON.stringify(informations)

      }).then((res)=>{
        toast.success('Login réussi');
        setIsLogged(true);
        sessionStorage.setItem('email', email);
        navigate("/");
      }).catch((err)=>{
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
          <img src={home} className="login-img" alt="logo-MetalMania" onClick={()=>navigate(`/`)}/>
          <div class="form-outline mb-4">
            <label class="form-label" for="form3Example3">Email</label>
            <input type="email" value={email} onChange={e=>emailupdate(e.target.value)} id="form3Example3" class="form-control" /> 
          </div>

          <div class="form-outline mb-4">
            <label class="form-label" for="form3Example4">Password</label>
            <input type="password" value={password} onChange={e=>passwordupdate(e.target.value)} id="form3Example4" class="form-control" />
            
          </div>

          <div className="login-buttons">
            <button type="submit" class="btn btn-primary">Se connecter</button>
            <button onClick={handleRegister} className="btn btn-primary" >S'inscrire</button>
          </div>

        </form>
      </div>
    </>
  )
}}