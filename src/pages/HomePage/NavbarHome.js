import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { urlServer } from "../../App";

export default function NavbarHome() {
    const navigate = useNavigate();
    const [doctorId, setDoctorId] = useState(null);

    useEffect(() => {
        let isSubscribed = true; // Flag to prevent state update if component is unmounted

        const fetchDoctor = async () => {
            try {
                const response = await Axios.get(`${urlServer}doctors/me`, { withCredentials: true });
                if (isSubscribed && response.status === 200 && response.data.doctor.doctor_id) {
                    setDoctorId(response.data.doctor.doctor_id);
                }
            } catch (error) {
                // If the component is still mounted, we log out the custom message
                if (isSubscribed) {
                    console.log("You are not logged in.");
                }
            }
        };

        fetchDoctor();

        return () => {
            isSubscribed = false; // Set the flag to false when the component unmounts
        };
    }, [navigate]);

    return (
        <nav>
            {doctorId ? (
                <Link className="link" to={`/doctorPage/${doctorId}`}>
                    <button className="inscription">Mon Profil</button>
                </Link>
            ) : (
                <Link className="link" to="/">
                    <button className="inscription">Médecin</button>
                </Link>
            )}
        </nav>
    );
}
