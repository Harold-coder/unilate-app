import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { urlServer } from "../../App"; // Assuming this is your server's URL

export default function NavbarHome() {
    const navigate = useNavigate();
    const [doctorId, setDoctorId] = useState(null);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await Axios.get(`${urlServer}doctors/me`, { withCredentials: true });
                if (response.status === 200 && response.data.doctor.doctor_id) {
                    setDoctorId(response.data.doctor.doctor_id);
                }
                // if not authorized or any other error, we silently fail and don't set doctorId
            } catch (error) {
                console.log("You are not logged in.");
            }
        };

        fetchDoctor();
    }, [navigate]);

    return (
        <nav>
            {doctorId ? (
                // If doctorId is present, show profile link
                <Link className="link" to={`/doctorPage/${doctorId}`}>
                    <button className="inscription">Mon Profil</button>
                </Link>
            ) : (
                // Otherwise, show the login button
                <Link className="link" to="/login">
                    <button className="inscription">Médecin</button>
                </Link>
            )}
        </nav>
    );
}
