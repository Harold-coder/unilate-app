import NavbarPatient from "../components/PatientPage/NavbarPatient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

// This page needs to be modified a lot hihi
function ModifyProfile() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [fullName, setFullName] = useState()
  const [profession, setProfession] = useState()
  const [city, setCity] = useState()
  const [gender, setGender] = useState("man")

  const [loaded, setLoaded] = useState(false)

  const [saved, setSaved] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)

  const params = useParams()
  const id = params.id

  const getUserById = (id) => {
    Axios.post("https://unilate-server-f22fc8c7c32c.herokuapp.com/getUserById", {
      id: id,
    }).then((data) => {
      const user = data.data[0]
      setLoaded(true)
      setEmail(user.email)
      setFullName(user.fullName)
      setCity(user.city)
      setProfession(user.profession)
      setGender(user.gender)
    });
  }

  const updateUserInfo = (id, email, fullName, profession, city, gender) => {
    Axios.post("https://unilate-server-f22fc8c7c32c.herokuapp.com/updateUserInfo", {
      id: id,
      email: email,
      fullName: fullName,
      profession: profession,
      city: city,
      gender: gender
    });
    setSaved(true)
  }

  const updateUserPassord = (id, password) => {
    Axios.post("https://unilate-server-f22fc8c7c32c.herokuapp.com/updateUserPassword", {
      id: id,
      password: password
    });
    setSaved(true)
  }

  useEffect(() => {
    getUserById(id);
  }, [id])

  useEffect(() => {
    setPasswordMatch(true);
    setSaved(false);
  }, [password, confirmPassword, email, fullName, profession, city, gender])


  function submitForm(event){
    event.preventDefault();
    if (password && password === confirmPassword){
      updateUserPassord(id, password);
    } else if (password && password !== confirmPassword){
      setPasswordMatch(false);
    }
    updateUserInfo(id, email, fullName, profession, city, gender);
  }
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
                <div className="email-div">
                <label className="signup-label">Genre</label>
                <select className="dropdownGender" onChange={(e) => setGender(e.target.value)} value={gender}>
                        <option value="man">Homme</option>
                        <option value="woman">Femme</option>
                    </select>
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