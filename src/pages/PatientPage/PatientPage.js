import DateTime from "../../components/DateTime";
import Retard from "../../components/Retard";
import DoctorProfile from "../../components/DoctorProfile";
import NavbarPatient from "../../components/NavbarPatient";
import "../../doctor-page.css"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import Axios from "axios";
import { urlServer } from "../../App";

function PatientPage() {
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchDoctorById(id);
    }
  }, [id]);

  const fetchDoctorById = async (doctorId) => {
    try {
      const response = await Axios.get(`${urlServer}doctors/${doctorId}`);
      setDoctor(response.data.doctor);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching doctor's data:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or any other loading state representation
  }

  return (
    <div className='patient-page'>
      <NavbarPatient/>
      {doctor && 
        <DoctorProfile
        picture={doctor.picture+".png"}
        name={doctor.name}
        city={doctor.city}
        job={doctor.specialty}
        />
      }
      <DateTime/>
      <Retard page="patient"/>
    </div>
  );
}

export default PatientPage;