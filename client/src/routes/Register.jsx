import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import { toast } from 'react-toastify';
import "./Register.css";

export default function Register() {

  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role_id = 2;

  const handleSubmit = (e) => {
    e.preventDefault();
    let informations = { lastname, firstname, email, password, role_id }
    console.log(informations);

    fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {"content-type" : "application/json"},
      body:JSON.stringify(informations)
    }).then((res)=>{
      toast.success('Enregistrement réussi');
      navigate("/login");
    }).catch((err)=>{
      toast.error('erreur')
    });
  }

  return (
    <>
        <Header />
        <div className='register'>

        <form onSubmit={handleSubmit}>
                <div class="row">
                  <h1 class="mb-3 h3">Inscription</h1>
                  <div class="col-md-12 mb-4">
                    <div class="form-outline">
                      <input type="text" name="Firstname" id="form3Example2" class="form-control" value={firstname} onChange={e=>setFirstname(e.target.value)} />
                      <label class="form-label" for="form3Example2">First Name</label>
                    </div>
                  </div>
                </div>

                <div class="form-outline">
                      <input type="text" name="Lastname" id="form3Example5" class="form-control" alue={lastname} onChange={e=>setLastname(e.target.value)}  />
                      <label class="form-label" for="form3Example5">Last Name</label>
                    </div>
  
                <div class="form-outline mb-4">
                  <input type="email" name="email" id="form3Example3" class="form-control" alue={email} onChange={e=>setEmail(e.target.value)}  />
                  <label class="form-label" for="form3Example3">Email address</label>
                </div>
  
                <div class="form-outline mb-4">
                  <input type="password" name="password" id="form3Example4" class="form-control" alue={password} onChange={e=>setPassword(e.target.value)}  />
                  <label class="form-label" for="form3Example4">Password</label>
                </div>

                <button type="submit" class="btn btn-primary btn-block mb-4">
                  S'inscrire
                </button>
  
                <div class="text-center">           
                </div>
              </form>
        </div>
    </>
  )
}