import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { urlServer } from "../../App";

// This page needs to be modified a lot hihi
function ModifyProfile() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [fullName, setFullName] = useState()
  const [profession, setProfession] = useState()
  const [city, setCity] = useState()
  const [picture, setPicture] = useState('man-white-brown')

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const avatars = [
    'man-asian', 'man-black', 'man-white-brown-blue', 'man-white-blond', 'man-white-brown', 'man-white-ginger', 
    'woman-asian-long', 'woman-asian-short', 'woman-black-long', 'woman-black-short', 
    'woman-white-long-blond', 'woman-white-long-brown', 'woman-white-short-blond', 'woman-white-short-brown',
    'woman-white-long-ginger', 'woman-white-short-ginger'
  ];

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
      if (response.status === 200 && response.data.doctor.doctor_id === parseInt(id)) {
        // User is authenticated and has access to this profile
        const doctor = response.data.doctor;
        setLoaded(true);
        setEmail(doctor.email);
        setFullName(doctor.name);
        setCity(doctor.city);
        setProfession(doctor.specialty);
        setPicture(doctor.picture);
      } else {
        // User is not authenticated or does not have access
        navigate('/login');
      }
    } catch (error) {
      console.error("Error verifying user's authentication:", error);
      navigate('/login');
    }
  };

  const updateDoctorInfo = async () => {
    try {
      // Update the doctor's basic info
      await Axios.put(`${urlServer}doctors/${id}`, {
        name: fullName,
        specialty: profession,
        city: city,
        email: email,
        picture: picture
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

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        try {
            const response = await Axios.delete(`${urlServer}doctors/delete/${id}`, { withCredentials: true });
            if (response.status === 200) {
                // Perform any additional cleanup or redirection here
                navigate('/login');
            }
        } catch (error) {
            console.error("Error deleting account:", error);
        }
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
    <Navbar/>
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

                <div className="avatar-selector">
                  <img 
                    onClick={openAvatarModal}
                    src={require(`../../images/${picture}.png`)} 
                    alt="Selected Avatar" 
                    className="selected-avatar-image"
                  />
                </div>
                {isAvatarModalOpen && <AvatarModal />}


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

            <div className="delete-account-section">
                <button className="delete-account-button" onClick={handleDeleteAccount}>
                    Delete Account
                </button>
            </div>
        </div>
      }
    </div>
    </div>
  );
}

export default ModifyProfile;