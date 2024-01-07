import NavbarPatient from "../../components/NavbarPatient";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import { urlServer } from "../../App";

function SignUp() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [fullName, setFullName] = useState()
  const [profession, setProfession] = useState()
  const [city, setCity] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [picture, setPicture] = useState('man-white-brown')

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const avatars = [
    'man-asian', 'man-black', 'man-white-brown-blue', 'man-white-blond', 'man-white-brown', 'man-white-ginger', 
    'woman-asian-long', 'woman-asian-short', 'woman-black-long', 'woman-black-short', 
    'woman-white-long-blond', 'woman-white-long-brown', 'woman-white-short-blond', 'woman-white-short-brown',
    'woman-white-long-ginger', 'woman-white-short-ginger'
  ];
  

  const [passwordMatch, setPasswordMatch] = useState(true)
  const [validFormat, setValidFormat] = useState(true)
  const [emailExists, setEmailExists] = useState(false)

  const navigate = useNavigate();

  const createUser = (email, password, fullName, profession, city, phoneNumber, picture) => {
    Axios.post(`${urlServer}doctors/register`, {
      name: fullName,
      specialty: profession,
      city: city,
      email: email,
      phone_number: phoneNumber,
      picture: picture,
      hospital_name: 'None',
      password: password,
    }).then((response) => {
      if (response.data.message === 'New doctor registered') {
        navigate('/login');     // TODO: Make it go to doctorPage instantly and add cookies. 
      } else {
        setEmailExists(true);
      }
    }).catch((error) => {
      setEmailExists(true); // Consider more specific error handling
    });
  };

  const handleAvatarClick = (avatar) => {
    setPicture(avatar);
    setIsAvatarModalOpen(false); // Close the modal after selection
  };

  const openAvatarModal = () => {
    setIsAvatarModalOpen(true);
  };

  const AvatarModal = () => (
    <div className="modal">
      <div className="modal-content">
        <div className="avatar-grid">
          {avatars.map((avatar) => (
            <img 
              key={avatar} 
              src={require(`../../images/${avatar}.png`)} 
              alt={avatar} 
              className={`avatar ${picture === avatar ? 'selected' : ''}`}
              onClick={() => handleAvatarClick(avatar)} 
            />
          ))}
        </div>
      </div>
    </div>
  );

  // TODO: Add a check for the phone number and re organise code using clean code rules
  function submitForm(event){
    event.preventDefault();
    if (!email || email.length < 5 || !fullName || fullName.length < 4 || !profession || profession.length < 2 || !city || city.length < 2){
      setValidFormat(false);
    } else if (!password || !confirmPassword || password !== confirmPassword || password.length < 3){
      setPasswordMatch(false);
    }
    else {  // Everything is good we can create the user
      createUser(email, password, fullName, profession, city, phoneNumber, picture);
    }
  }

  useEffect(() => {
    setPasswordMatch(true);
    setValidFormat(true);
    setEmailExists(false);
  }, [email, fullName, city, profession, password, confirmPassword])


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
                <label className="signup-label">Numéro de telephone</label>
                <input type="text" placeholder="+32..." className="login-input" onChange={(e) => setPhoneNumber(e.target.value)}></input>
                </div>
                

                <div className="avatar-selector">
                  {/* <button className="avatar-button" type="button" onClick={openAvatarModal}>Choose Avatar</button> */}
                  <img 
                    onClick={openAvatarModal}
                    src={require(`../../images/${picture}.png`)} 
                    alt="Selected Avatar" 
                    className="selected-avatar-image"
                  />
                </div>
                {isAvatarModalOpen && <AvatarModal />}

                <div className="password-div">
                <label className="signup-label">Mot de passe</label>
                <input type="password" placeholder="*********" className="login-input" onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className="password-div">
                <label className="signup-label">Confirmer le mot de passe</label>
                <input type="password" placeholder="*********" className="login-input" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                {!passwordMatch && <label className="signup-label signup-label-red">Les mots de passe ne correspondent pas.</label>}
                {!validFormat && <label className="signup-label signup-label-red">Certains champs n'ont pas été complétés correctement.</label>}
                {emailExists && <label className="signup-label signup-label-red">L'adresse email existe déjà.</label>}
                </div>
                <button className="signup-button" onClick={submitForm}>Créer le compte</button>
            </form>
        </div>
    </div>
    </div>
  );
}

export default SignUp;