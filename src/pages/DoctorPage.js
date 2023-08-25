import NavbarDoctor from "../components/DoctorPage/NavbarDoctor";
import Retard from "../components/General/Retard";
import DateTime from "../components/General/DateTime";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";

function DoctorPage() {
  const [user, setUser] = useState()
  const [loaded, setLoaded] = useState(false)
  const params = useParams()
  const id = params.id

  const getUserById = (id) => {
    Axios.post("https://unilate-server-f22fc8c7c32c.herokuapp.com/getUserById", {
      id: id,
    }).then((data) => {
      setUser(data.data[0])
      setLoaded(true)
    });
  }

  useEffect(() => {
    getUserById(id);
  }, [id])

  return (
    <div className='doctor-page'>
      {loaded && 
        <div>
          <NavbarDoctor picture={`${user.gender}-image.png`} id={id}/>
          <DateTime />
          <Retard page="doctor"/>
        </div>
      }
    </div>
  );
}

export default DoctorPage;
