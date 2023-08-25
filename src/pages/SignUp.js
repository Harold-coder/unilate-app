import NavbarPatient from "../components/PatientPage/NavbarPatient";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios"

function SignUp() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [fullName, setFullName] = useState()
  const [profession, setProfession] = useState()
  const [city, setCity] = useState()
  const [gender, setGender] = useState("man")

  const [passwordMatch, setPasswordMatch] = useState(true)
  const [validFormat, setValidFormat] = useState(true)

  const navigate = useNavigate();

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

  function submitForm(event){
    event.preventDefault();
    if (!email || email.length < 5 || !fullName || fullName.length < 4 || !profession || profession.length < 2 || !city || city.length < 2){
      setValidFormat(false);
    } else if (!password || !confirmPassword || password !== confirmPassword || password.length < 3){
      setPasswordMatch(false);
    }
    else {
      createUser(email, password, fullName, profession, city, gender);
      navigate('/doctorPage')
    }
  }

  useEffect(() => {
    setPasswordMatch(true);
    setValidFormat(true);
  }, [email, fullName, city, profession, gender, password, confirmPassword])
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
                <select className="dropdownGender" onChange={(e) => setGender(e.target.value)}>
                        <option value="man">Homme</option>
                        <option value="woman">Femme</option>
                    </select>
                </div>
                <div className="password-div">
                <label className="signup-label">Mot de passe</label>
                <input type="password" placeholder="*********" className="login-input" onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className="password-div">
                <label className="signup-label">Confirmer le mot de passe</label>
                <input type="password" placeholder="*********" className="login-input" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                {!passwordMatch && <label className="signup-label signup-label-red">Les mots de passe ne correspondent pas.</label>}
                {!validFormat && <label className="signup-label signup-label-red">Certains champs n'ont pas été complétés.</label>}
                </div>
                <button className="signup-button" onClick={submitForm}>Créer le compte</button>
            </form>
        </div>
    </div>
    </div>
  );
}

export default SignUp;