import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import NavbarDoctor from "../components/DoctorPage/NavbarDoctor";
import DateTime from "../components/General/DateTime";
import Retard from "../components/General/Retard";
import { urlServer } from "../App";

function DoctorPage() {
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // Axios defaults for all requests
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchDoctorById = async () => {
      try {
        // The token is now managed by the browser cookies
        const response = await Axios.get(`${urlServer}doctors/me`);
        setDoctor(response.data.doctor);
        setIsLoading(false);
      } catch (error) {
        // If there's an error (e.g., 401 Unauthorized), navigate to the login page
        navigate('/login');
      }
    };

    if (id) {
      fetchDoctorById();
    }
  }, [id, navigate]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
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
