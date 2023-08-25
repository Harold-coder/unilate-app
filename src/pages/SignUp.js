import NavbarPatient from "../components/PatientPage/NavbarPatient";
import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "axios"

function SignUp() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [fullName, setFullName] = useState()
  const [profession, setProfession] = useState()
  const [city, setCity] = useState()
  const [gender, setGender] = useState()
  const [passwordMatch, setPasswordMatch] = useState(true)
  const createUser = (email, password, fullName, profession, city, gender) => {
    Axios.post("https://unilate-server-f22fc8c7c32c.herokuapp.com/createUser", {
      email: email,
      password: password,
      fullName: fullName,
      profession: profession,
      city: city,
      gender: gender
    });
  }

  function submitForm(){
    // Check that passwords match
    if (password !== confirmPassword){
      setPasswordMatch(false);
    }
    else {
      setPasswordMatch(true);
      createUser(email, password, fullName, profession, city, gender);
    }
  }
  return (
    <div>
    <NavbarPatient/>
    <div className='login-page'>
        <div className="signup-full-form">
            <form className="signup-form">
                <div className="email-div">
                <label className="signup-label">Email</label>
                <input type="text" placeholder="email@example.com" className="login-input" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="email-div">
                <label className="signup-label">Nom et Prénom</label>
                <input type="text" placeholder="John Doe" className="login-input" onChange={(e) => setFullName(e.target.value)}></input>
                </div>
                <div className="email-div">
                <label className="signup-label">Ville</label>
                <input type="text" placeholder="Gembloux" className="login-input" onChange={(e) => setCity(e.target.value)}></input>
                </div>
                <div className="email-div">
                <label className="signup-label">Profession</label>
                <input type="text" placeholder="Gynécologue" className="login-input" onChange={(e) => setProfession(e.target.value)}></input>
                </div>
                <div className="email-div">
                <label className="signup-label">Genre</label>
                <input type="text" placeholder="Homme" className="login-input" onChange={(e) => setGender(e.target.value)}></input>
                </div>
                <div className="password-div">
                <label className="signup-label">Mot de passe</label>
                <input type="password" placeholder="*********" className="login-input" onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className="password-div">
                <label className="signup-label">Confirmer le mot de passe</label>
                <input type="password" placeholder="*********" className="login-input" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                {!passwordMatch && <label className="signup-label signup-label-red">Le mot de passe ne match pas.</label>}
                </div>
                <Link className="link" to="/doctorPage"><button className="signup-button" onClick={submitForm}>Créer le compte</button></Link>
            </form>
        </div>
    </div>
    </div>
  );
}

export default SignUp;