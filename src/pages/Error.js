import { Link } from "react-router-dom";

function Error() {
    return (
      <div className='error-page'>
        <p>Cette page est en cours de développement...</p>
        <Link className="link" to="/">
            <img className="construction-image" src={require("../images/undefined-image.png")} alt="pic"></img>
        </Link>
      </div>
    );
  }
  
  export default Error;