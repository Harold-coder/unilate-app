import DateTime from "../components/General/DateTime";
import Retard from "../components/General/Retard";
import DoctorProfile from "../components/PatientPage/DoctorProfile";
import NavbarPatient from "../components/PatientPage/NavbarPatient";
import "../doctor-page.css"
import { useLocation } from 'react-router-dom'

function PatientPage() {

  // Harold 
  const location = useLocation()
  const { props } = location.state
  console.log(props)
  return (
    <div className='patient-page'>
      <NavbarPatient/>
      <DoctorProfile
        picture={props.picture}
        name={props.name}
        city={props.city}
        job={props.job}
        />
      <DateTime/>
      <Retard page="patient"/>
    </div>
  );
}

export default PatientPage;