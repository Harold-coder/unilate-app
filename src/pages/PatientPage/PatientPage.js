import DateTime from "../../components/DateTime";
import DoctorProfile from "../../components/DoctorProfile";
import Navbar from "../../components/Navbar";
import "../../doctor-page.css"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import Axios from "axios";
import { urlServer } from "../../App";
import DelayPatient from "./DelayPatient";
import Loading from "../../components/Loading";

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
    return <Loading/>; // Or any other loading state representation
  }

  return (
    <div className='patient-page'>
      <Navbar/>
      {doctor && 
        <DoctorProfile
        picture={doctor.picture+".png"}
        name={doctor.name}
        city={doctor.city}
        job={doctor.specialty}
        />
      }
      <DateTime/>
      <DelayPatient/>
    </div>
  );
}

export default PatientPage;