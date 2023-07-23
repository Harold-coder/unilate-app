import MainDoctor from "../components/DoctorPage/MainDoctor";
import NavbarDoctor from "../components/DoctorPage/NavbarDoctor";
import Retard from "../components/General/Retard";
import "../doctor-page.css"

function DoctorPage() {
  return (
    <div className='doctor-page'>
      <NavbarDoctor picture="person-image.png"/>
      <MainDoctor/>
      <Retard page="doctor"/>
    </div>
  );
}

export default DoctorPage;
