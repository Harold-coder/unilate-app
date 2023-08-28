import { Link, useNavigate } from "react-router-dom";
import NavbarPatient from "../components/PatientPage/NavbarPatient";
import { useEffect, useState } from "react";
import Axios from "axios";
import { urlServer } from "../App";

function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [invalidCredentials, setInvalidCredentials] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  // const [loginStatus, setLoginStatus] = useState(false)

  Axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const confirmLogin = (email, password) => {
    console.log("here")
    Axios.post(`${urlServer}confirmLogin`, {
      email: email,
      password: password
    }).then((data) => {
      var user = data.data
      if (user && user.length === 1){
        navigate(`/doctorPage/${user[0].id}`)
      }
      else{
        setErrorMessage(data.data)
        setInvalidCredentials(true)
      }
    });
  }

  function submitConnect(event){
    event.preventDefault()
    confirmLogin(email, password);
  }

  useEffect(() => {
    setInvalidCredentials(false)
  }, [email, password]);

  // useEffect(() => {
  //   Axios.get(`${urlServer}isLogin`).then((response) => {
  //     if (response.data.loggedIn === true){
  //       setLoginStatus(response.data.user[0].id)
  //     }
  //   })
  // }, [])

  return (
    <div>
    <NavbarPatient/>
    <div className='login-page'>
        <div className="login-full-form">
            <form className="login-form">
                <div className="email-div">
                <label className="login-label">Email</label>
                <input type="text" placeholder="email@example.com" className="login-input" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="password-div">
                <label className="login-label">Mot de passe</label>
                <input type="password" placeholder="*********" className="login-input" onChange={(e) => setPassword(e.target.value)}></input>
                {invalidCredentials && <label className="signup-label signup-label-red">{errorMessage}</label>}
                </div>
                <button className="login-button" onClick={submitConnect}>Se connecter</button>
            </form>
            <div className="create-account">
                <label className="login-label">Pas encore de compte?</label>
                <Link className="link" to="/signup"><button className="create-button">Créer un compte</button></Link>
            </div>
        </div>
    </div>
    </div>
  );
}

export default Login;