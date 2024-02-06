import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    let informations = { lastname, firstname, email, password, role_id };

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

  const handleRegister = () => {
    navigate('/login')
  }

  return (
    <>
      <div className='register'>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <h1 className="mb-4 h3" style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>Inscription</h1>
            <div className="col-md-12 mb-3">
              <div className="form-outline">
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                  <label className="form-label" for="form3Example2">First Name</label>
                </div>
                <input style={{textAlign: "center"}} type="text" name="Firstname" id="form3Example2" className="form-control" value={firstname} onChange={e=>setFirstname(e.target.value)} /> 
              </div>
            </div>
          </div>

          <div className="form-outline mb-3">
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
              <label className="form-label" for="form3Example5">Last Name</label>
            </div>
            <input style={{textAlign: "center"}} type="text" name="Lastname" id="form3Example5" className="form-control" alue={lastname} onChange={e=>setLastname(e.target.value)}  /> 
          </div>

          <div className="form-outline mb-3">
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
              <label className="form-label" for="form3Example3">Email address</label>
            </div>
            <input style={{textAlign: "center"}} type="email" name="email" id="form3Example3" className="form-control" alue={email} onChange={e=>setEmail(e.target.value)}  />  
          </div>

          <div className="form-outline mb-3">
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
              <label className="form-label" for="form3Example4">Password</label>
            </div>
            <input style={{textAlign: "center"}} type="password" name="password" id="form3Example4" className="form-control" alue={password} onChange={e=>setPassword(e.target.value)}  />
          </div>

          <div className='register-buttons'>
            <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor: "black", color: "white", border: "solid 1px white", padding: "1vh", borderRadius: "10px"}}>
              S'inscrire
            </button>
            <button onClick={handleRegister} className="btn btn-block" style={{backgroundColor: "black", color: "white", border: "solid 1px white", padding: "1vh", borderRadius: "10px"}}>
              Retour
            </button>
          </div>

          <div className="text-center">           
          </div>
        </form>
      </div>
    </>
  )
}