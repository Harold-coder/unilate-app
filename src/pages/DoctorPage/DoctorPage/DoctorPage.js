import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import NavbarDoctor from "../NavbarDoctor/NavbarDoctor";
import DateTime from "../../../components/DateTime/DateTime";
import { localDev, mockDoctor, urlServer } from "../../../App";
import DelayDoctor from "../DelayDoctor/DelayDoctor";
import Loading from "../../../components/Loading/Loading";

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
        const response = await Axios.get(`${urlServer}doctors/private/${id}`);
        setDoctor(response.data.doctor);
        setIsLoading(false);
      } catch (error) {
        // If there's an error (e.g., 401 Unauthorized), navigate to the login page
        navigate('/login');
      }
    };

    if (id) {
      if (localDev) {
        setDoctor(mockDoctor);
        setIsLoading(false);
      } else {
        fetchDoctorById();
      }
    }
  }, [id, navigate]);

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div className='doctor-page'>
      {doctor && (
        <div>
          <NavbarDoctor picture={doctor.picture+".png"} id={doctor.doctor_id} />
          {localDev && <p>We are testing locally, we are using Mock values for the doctor in order to bypass cookies.</p>}
          <DateTime />
          <DelayDoctor/>
        </div>
      )}
    </div>
  );
}

export default DoctorPage;
