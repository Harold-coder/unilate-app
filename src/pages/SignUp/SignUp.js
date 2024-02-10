import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import { urlServer } from "../../App";
import Loading from "../../components/Loading/Loading";
import './SignUp.css';

function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [profession, setProfession] = useState("")
  const [city, setCity] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [picture, setPicture] = useState('man-white-brown')

  const [stage, setStage] = useState(1);

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const avatars = [
    'man-asian', 'man-black', 'man-white-brown-blue', 'man-white-blond', 'man-white-brown', 'man-white-ginger', 
    'woman-asian-long', 'woman-asian-short', 'woman-black-long', 'woman-black-short', 
    'woman-white-long-blond', 'woman-white-long-brown', 'woman-white-short-blond', 'woman-white-short-brown',
    'woman-white-long-ginger', 'woman-white-short-ginger'
  ];
  
  Axios.defaults.withCredentials = true;

  const [passwordMatch, setPasswordMatch] = useState(true)
  const [validFormat, setValidFormat] = useState(true)
  const [error, setError] = useState(false)

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const createUser = (email, password, fullName, profession, city, phoneNumber, picture) => {
    setLoading(true);
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
        fetchDoctorIdAndRedirect(); 
      } else {
        setLoading(false);
        setError(true);   //TODO: change this to a better message
      }
    }).catch((error) => {
      setLoading(false);
      setError(true); // Consider more specific error handling
    });
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
        setLoading(false);
        // Handle any error or unexpected response
        console.error('Failed to get doctor id');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching doctor id:', error);
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  }

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
    setLoading(false);
    setPasswordMatch(true);
    setValidFormat(true);
    setError(false);
  }, [email, fullName, city, profession, password, confirmPassword])


  return (
    <div>
    <Navbar/>
    {loading && 
        <Loading/>
    }
    {!loading && 
      <form className="signup-form" onSubmit={submitForm}>
        {stage === 1 && (
          <div className="form-group">
            <p className="signup-title"><span className="big-u">U</span>nilate</p>
            <input type="email" placeholder="Email..." className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
            <button type="button" className="form-next-btn" onClick={() => email.length > 8 && setStage(stage + 1)} disabled={email.length <=8}>Suivant</button>
            <button type="button" className="form-next-btn already" onClick={navigateToLogin}>J'ai déjà un compte!</button>
          </div>
        )}
        {stage === 2 && (
          <>
            <div className="form-group">
              <p className="signup-title"><span className="big-u">U</span>nilate</p>
              <input type="text" placeholder="Nom et Prénom..." className="form-input" value={fullName} onChange={(e) => setFullName(e.target.value)} autoFocus />
              <button type="button" className="form-next-btn" onClick={() => fullName.length > 4 && setStage(stage + 1)} disabled={fullName.length <=4}>Suivant</button>
              <button type="button" className="form-back-btn" onClick={() => setStage(stage - 1)}>Précédent</button>
            </div>
          </>
        )}
        {stage === 3 && (
          <>
            <div className="form-group">
              <p className="signup-title"><span className="big-u">U</span>nilate</p>
              <input type="text" placeholder="Profession...." className="form-input" value={profession} onChange={(e) => setProfession(e.target.value)} autoFocus />
              <button type="button" className="form-next-btn" onClick={() => profession.length > 2 && setStage(stage + 1)} disabled={profession.length <=2}>Suivant</button>
              <button type="button" className="form-back-btn" onClick={() => setStage(stage - 1)}>Précédent</button>
            </div>
          </>
        )}
        {stage === 4 && (
          <>
            <div className="form-group">
              <p className="signup-title"><span className="big-u">U</span>nilate</p>
              <input type="text" placeholder="Ville..." className="form-input" value={city} onChange={(e) => setCity(e.target.value)} autoFocus />
              <button type="button" className="form-next-btn" onClick={() => city.length > 1 && setStage(stage + 1)} disabled={city.length <=1}>Suivant</button>
              <button type="button" className="form-back-btn" onClick={() => setStage(stage - 1)}>Précédent</button>
            </div>
          </>
        )}
        {stage === 5 && (
          <>
            <div className="form-group">
              <p className="signup-title"><span className="big-u">U</span>nilate</p>
              <input type="text" placeholder="Numéro de téléphone..." className="form-input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} autoFocus />
              <button type="button" className="form-next-btn" onClick={() => phoneNumber.length > 6 && setStage(stage + 1)} disabled={phoneNumber.length <=6}>Suivant</button>
              <button type="button" className="form-back-btn" onClick={() => setStage(stage - 1)}>Précédent</button>
            </div>
          </>
        )}
        {stage === 6 && (
          <>
            <div className="form-group">
              <p className="signup-title"><span className="big-u">U</span>nilate</p>
              <div className="avatar-selector">
                <img 
                  onClick={openAvatarModal}
                  src={require(`../../images/${picture}.png`)} 
                  alt="Selected Avatar" 
                  className="selected-avatar-image"
                />
              </div>
              {isAvatarModalOpen && <AvatarModal />}
              <button type="button" className="form-next-btn" onClick={() => setStage(stage + 1)}>Suivant</button>
              <button type="button" className="form-back-btn" onClick={() => setStage(stage - 1)}>Précédent</button>
            </div>
          </>
        )}
        {stage === 7 && (
          <>
            <div className="form-group">
              <p className="signup-title"><span className="big-u">U</span>nilate</p>
              <input type="password" placeholder="Mot de Passe..." className="form-input password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
              <input type="password" placeholder="Confirmer Le Mot de Passe..." className="form-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoFocus />
              {!passwordMatch && <p className="error-label">Les mots de passe ne correspondent pas.</p>}
              {!validFormat && <p className="error-label">Certains champs n'ont pas été complétés correctement.</p>}
              {error && <p className="error-label">Une erreur est survenue.</p>}
              <button type="button" className="form-next-btn confirm" onClick={submitForm}>Confirmer!</button>
              <button type="button" className="form-back-btn" onClick={() => setStage(stage - 1)}>Précédent</button>
            </div>
          </>
        )}
      </form>
    }
    </div>
  );
}

export default SignUp;
