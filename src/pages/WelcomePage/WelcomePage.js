import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  const navigateToPatient = () => {
    navigate('/home'); // Replace '/home' with the actual path for the HomePage
  };

  const navigateToMedecin = () => {
    navigate('/login'); // Replace '/login' with the actual path for the login page
  };

  return (
    <div className="welcome-page">
        <h1 className='welcome-h1'>Bienvenue sur Unilate</h1>
        <p className='welcome-p'>Qui êtes-vous:</p>
        <div>
            <button onClick={navigateToPatient} className="welcome-button">Patient</button>
            <button onClick={navigateToMedecin} className="welcome-button">Médecin</button>
        </div>
        
    </div>
  );
}

export default WelcomePage;
