import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { toast } from 'react-toastify';
import "./Register.css";
import { useNavigate } from 'react-router-dom';

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
  
      fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {"content-type" : "application/json"},
        body:JSON.stringify(informations)

      }).then((res)=>{
        toast.success('Login réussi');
        setIsLogged(true);
        navigate("/login");
      }).catch((err)=>{
        toast.error('erreur')
      });
    }

    console.log(isLogged)

  return (
    <>
      <Header />
      <div className='register'>
        <form onSubmit={ProceedLogin}>

          <div class="form-outline mb-4">
            <input type="email" value={email} onChange={e=>emailupdate(e.target.value)} id="form3Example3" class="form-control" />
            <label class="form-label" for="form3Example3">Email</label>
          </div>

          <div class="form-outline mb-4">
            <input type="password" value={password} onChange={e=>passwordupdate(e.target.value)} id="form3Example4" class="form-control" />
            <label class="form-label" for="form3Example4">Password</label>
          </div>

          <button type="submit" class="btn btn-primary btn-block mb-4">Se connecter</button>

        </form>
      </div>
    </>
  )
}