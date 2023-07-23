import NavbarDoctor from "../components/DoctorPage/NavbarDoctor";
import Retard from "../components/General/Retard";
import DateTime from "../components/General/DateTime";
import "../doctor-page.css"

function DoctorPage() {
  return (
    <div className='doctor-page'>
      <NavbarDoctor picture="person-image.png"/>
      <DateTime />
      <Retard page="doctor"/>
    </div>
  );
}

export default DoctorPage;
