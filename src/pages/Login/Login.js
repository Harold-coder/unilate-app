import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { urlServer } from "../../App";
import Loading from "../../components/Loading/Loading";
import './Login.css';

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

      if (response.status === 200 && response.data.doctor.doctor_id) {
        navigate(`/doctorPage/${response.data.doctor.doctor_id}`);
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

    setLoading(true);
    try {
      const response = await Axios.post(`${urlServer}doctors/login`, {
        email: email,
        password: password
      }, { withCredentials: true });

      if (response.status === 200) {
        // Call the function to fetch the doctor_id and redirect
        console.log("Login successful, let's move on.");
        fetchDoctorIdAndRedirect();
      } else {
        throw new Error('Unauthorized'); // This will be caught by the catch block below
      }
    } catch (error) {
      setLoading(false); // Stop loading when an error occurs
      setErrorMessage('Une erreur est survenue, veuillez réessayer.');
      setInvalidCredentials(true);
    }
  };

  return (
    <div>
      <Navbar />
      {loading && 
        <Loading/>
      }

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

          <div>
            <div className="right-form-a">
              <label className="login-label-a">Pas encore de compte?</label>
              <Link className="link" to="/signup"><button className="create-button-a">Créer un compte</button></Link>
            </div>
            <div className="right-form-b">
              <label className="login-label">Besoin d'aide ? </label>
              <a href="mailto:harold.unilate@gmail.com?subject=Help Request from Unilate" className="mail-button">Mail</a>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Login;
