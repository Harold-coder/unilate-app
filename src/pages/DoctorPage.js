import NavbarDoctor from "../components/DoctorPage/NavbarDoctor";
import Retard from "../components/General/Retard";
import DateTime from "../components/General/DateTime";

function DoctorPage() {
  return (
    <div className='doctor-page'>
      <NavbarDoctor picture="man-image.png"/>
      <DateTime />
      <Retard page="doctor"/>
    </div>
  );
}

export default DoctorPage;
