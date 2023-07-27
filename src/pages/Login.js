import { Link } from "react-router-dom";
import NavbarPatient from "../components/PatientPage/NavbarPatient";

function Login() {
  return (
    <div>
    <NavbarPatient/>
    <div className='login-page'>
        <div className="login-full-form">
            <form className="login-form">
                <div className="email-div">
                <label className="login-label">Email</label>
                <input type="text" placeholder="email@example.com" className="login-input"></input>
                </div>
                <div className="password-div">
                <label className="login-label">Mot de passe</label>
                <input type="password" placeholder="*********" className="login-input"></input>
                </div>
                <Link className="link" to="/doctorPage"><button className="login-button">Se connecter</button></Link>
            </form>
            <div className="create-account">
                <label className="login-label">Pas encore de compte?</label>
                <Link className="link" to="/signup"><button className="login-button">Créer un compte</button></Link>
            </div>
        </div>
    </div>
    </div>
  );
}

export default Login;