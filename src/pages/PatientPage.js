import DateTime from "../components/General/DateTime";
import Retard from "../components/General/Retard";
import DoctorProfile from "../components/PatientPage/DoctorProfile";
import NavbarPatient from "../components/PatientPage/NavbarPatient";
import "../doctor-page.css"

function PatientPage() {
  return (
    <div className='doctor-page'>
      <NavbarPatient/>
      <DoctorProfile
        picture="person-image.png" 
        name="Etienne Castiaux" 
        city="Wavre"
        job="Plombier"
        />
      <DateTime/>
      <Retard page="patient"/>
    </div>
  );
}

export default PatientPage;