import NavbarPatient from "../components/PatientPage/NavbarPatient";
import { Link } from "react-router-dom";


// This page needs to be modified a lot hihi
function ModifyProfile() {
  return (
    <div>
    <NavbarPatient/>
    <div className='login-page'>
        <div className="signup-full-form">
            <form className="signup-form">
                <div className="email-div">
                <label className="signup-label">Email</label>
                <input type="text" placeholder="email@example.com" className="login-input"></input>
                </div>
                <div className="email-div">
                <label className="signup-label">Nom et Prénom</label>
                <input type="text" placeholder="John Doe" className="login-input"></input>
                </div>
                <div className="email-div">
                <label className="signup-label">Ville</label>
                <input type="text" placeholder="Gembloux" className="login-input"></input>
                </div>
                <div className="email-div">
                <label className="signup-label">Profession</label>
                <input type="text" placeholder="Gynécologue" className="login-input"></input>
                </div>
                <div className="password-div">
                <label className="signup-label">Nouveau mot de passe</label>
                <input type="password" placeholder="*********" className="login-input"></input>
                </div>
                <div className="password-div">
                <label className="signup-label">Confirmer le nouveau mot de passe</label>
                <input type="password" placeholder="*********" className="login-input"></input>
                </div>
                <Link className="link" to="/doctorPage"><button className="signup-button">Sauvegarder</button></Link>
            </form>
        </div>
    </div>
    </div>
  );
}

export default ModifyProfile;