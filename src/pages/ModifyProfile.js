import NavbarPatient from "../components/PatientPage/NavbarPatient";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Axios from "axios";
import { urlServer } from "../App";

// This page needs to be modified a lot hihi
function ModifyProfile() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [fullName, setFullName] = useState()
  const [profession, setProfession] = useState()
  const [city, setCity] = useState()

  const [loaded, setLoaded] = useState(false)

  const [saved, setSaved] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Call the `/doctors/me` endpoint to verify if the user is authenticated
    fetchCurrentDoctorAndVerify();
  }, [id, navigate]);

  const fetchCurrentDoctorAndVerify = async () => {
    try {
      const response = await Axios.get(`${urlServer}doctors/me`, { withCredentials: true });
      if (response.data.doctor.doctor_id === parseInt(id)) {
        console.log("MADE IT");
        console.log(response);
        // User is authenticated and has access to this profile
        getUserById(id);
      } else {
        // User is not authenticated or does not have access
        console.log("DENIED");
        console.log(response);
        // navigate('/login');
      }
    } catch (error) {
      console.error("Error verifying user's authentication:", error);
      navigate('/login');
    }
  };


  const getUserById = async () => {
    try {
      const response = await Axios.get(`${urlServer}doctors/${id}`);
      const doctor = response.data.doctor;
      setLoaded(true);
      setEmail(doctor.email);
      setFullName(doctor.name);
      setCity(doctor.city);
      setProfession(doctor.specialty);
    } catch (error) {
      console.error("Error fetching doctor's data:", error);
    }
  };

  const updateDoctorInfo = async () => {
    try {
      // Update the doctor's basic info
      await Axios.put(`${urlServer}doctors/${id}`, {
        name: fullName,
        specialty: profession,
        city: city,
        email: email
      }, { withCredentials: true });
  
      // Update the password if provided
      if (password && password === confirmPassword) {
        await updateDoctorPassword(id, password);
      }
  
      setSaved(true);
    } catch (error) {
      console.error("Error updating doctor's info:", error);
    }
  };
  
  const updateDoctorPassword = async (doctorId, newPassword) => {
    try {
      await Axios.put(`${urlServer}doctors/update_password/${doctorId}`, {
        password: newPassword
      }, { withCredentials: true });
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  function submitForm(event) {
    event.preventDefault();
    if (!password || password === confirmPassword) {
      updateDoctorInfo();
    } else {
      setPasswordMatch(false);
    }
  }

  useEffect(() => {
    setPasswordMatch(true);
    setSaved(false);
  }, [password, confirmPassword, email, fullName, profession, city])

  return (
    <div>
    <NavbarPatient/>
    <div className='login-page'>
      {loaded &&
        <div className="signup-full-form">
            <form className="signup-form">
                <div className="email-div">
                <label className="signup-label">Email</label>
                <input type="text" placeholder="email@example.com" className="login-input" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                </div>
                <div className="email-div">
                <label className="signup-label">Nom et Prénom</label>
                <input type="text" placeholder="John Doe" className="login-input" onChange={(e) => setFullName(e.target.value)} value={fullName}></input>
                </div>
                <div className="email-div">
                <label className="signup-label">Ville</label>
                <input type="text" placeholder="Gembloux" className="login-input" onChange={(e) => setCity(e.target.value)} value={city}></input>
                </div>
                <div className="email-div">
                <label className="signup-label">Profession</label>
                <input type="text" placeholder="Gynécologue" className="login-input" onChange={(e) => setProfession(e.target.value)} value={profession}></input>
                </div>
                <div className="password-div">
                <label className="signup-label">Nouveau mot de passe</label>
                <input type="password" placeholder="*********" className="login-input" onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className="password-div">
                <label className="signup-label">Confirmer le nouveau mot de passe</label>
                <input type="password" placeholder="*********" className="login-input" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>
                <button className="signup-button" onClick={submitForm}>Sauvegarder</button>
                {saved && <label className="signup-label">Modifications sauvées!</label>}
                {!passwordMatch && <label className="signup-label signup-label-red">Les mots de passe ne correspondent pas.</label>}
            </form>
        </div>
      }
    </div>
    </div>
  );
}

export default ModifyProfile;