import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import NavbarDoctor from "../components/DoctorPage/NavbarDoctor";
import DateTime from "../components/General/DateTime";
import Retard from "../components/General/Retard";
import { urlServer } from "../App";

function DoctorPage() {
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
    <div className='doctor-page'>
      {doctor && (
        <div>
          <NavbarDoctor picture="man-image.png" id={doctor.id} />
          <DateTime />
          <Retard page="doctor"/>
        </div>
      )}
    </div>
  );
}

export default DoctorPage;