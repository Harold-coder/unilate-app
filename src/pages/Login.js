import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import NavbarPatient from "../components/PatientPage/NavbarPatient";
import { urlServer } from "../App";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  Axios.defaults.withCredentials = true;


  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const fetchDoctorIdAndRedirect = async () => {
    try {
      // Assuming you have an endpoint like `/doctors/me` that uses the token to identify the doctor
      const response = await Axios.get(`${urlServer}doctors/me`, {
        withCredentials: true // if you're using cookies
      });

      if (response.status === 200 && response.data.doctor_id) {
        navigate(`/doctorPage/${response.data.doctor_id}`);
      } else {
        // Handle any error or unexpected response
        console.error('Failed to get doctor id');
      }
    } catch (error) {
      console.error('Error fetching doctor id:', error);
    }
  };

  const submitConnect = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage('Veuillez entrer une addresse email valide.');
      setInvalidCredentials(true);
      return;
    }

    if (!password) {
      setErrorMessage('Le mot de passe ne peut pas être vide.');
      setInvalidCredentials(true);
      return;
    }

    try {
      setLoading(true);
      const response = await Axios.post(`${urlServer}doctors/login`, {
        email: email,
        password: password
      }, { withCredentials: true });

      if (response.status === 200) {
        // Call the function to fetch the doctor_id and redirect
        console.log(response);
        fetchDoctorIdAndRedirect();
      } else {
        setLoading(false);
        setErrorMessage('Email ou mot de passe invalide.');
        setInvalidCredentials(true);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Une erreur est survenue, veuillez réessayer.');
      setInvalidCredentials(true);
    }
  };

  return (
    <div>
      <NavbarPatient />
      {loading && <div className="loading">Validation en cours...</div>}

      {!loading && 
        <div className='login-page'>
          <div className="login-full-form">
            <form className="login-form" onSubmit={submitConnect}>
              <div className="email-div">
                <label className="login-label">Email</label>
                <input type="text" placeholder="email@example.com" className="login-input" onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="password-div">
                <label className="login-label">Mot de passe</label>
                <input type="password" placeholder="*********" className="login-input" onChange={(e) => setPassword(e.target.value)} />
                {invalidCredentials && <label className="signup-label signup-label-red">{errorMessage}</label>}
              </div>
              <button type="submit" className="login-button">Se connecter</button>
            </form>
          </div>

          <div className="arsenetest">
            <div className="right-form-a">
              <label className="login-label-a">Pas encore de compte?</label>
              <Link className="link" to="/signup"><button className="create-button-a">Créer un compte</button></Link>
            </div>
            <div className="right-form-b">
              <label className="login-label">Besoin d'aide ? </label>
              <button className="create-button">Mail</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Login;
