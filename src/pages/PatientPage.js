import DateTime from "../components/General/DateTime";
import Retard from "../components/General/Retard";
import DoctorProfile from "../components/PatientPage/DoctorProfile";
import NavbarPatient from "../components/PatientPage/NavbarPatient";
import "../doctor-page.css"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import Axios from "axios";
import { urlServer } from "../App";

function PatientPage() {
  const [user, setUser] = useState()
  const [loaded, setLoaded] = useState()

  const params = useParams()
  const id = params.id
  
  const getUserById = (id) => {
    Axios.post(`${urlServer}getUserById`, {
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
    <div className='patient-page'>
      <NavbarPatient/>
      {loaded && 
        <DoctorProfile
        picture={user.gender.concat("-image.png")}
        name={user.fullName}
        city={user.city}
        job={user.profession}
        />
      }
      <DateTime/>
      <Retard page="patient"/>
    </div>
  );
}

export default PatientPage;