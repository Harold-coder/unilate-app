import React, { useState } from 'react';
import axios from 'axios';
import { urlServer } from "../../../App";
import './Notification.css'; // Ensure the path is correct

const Notification = (props) => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${urlServer}subscribe`, {
                doctor_id: props.doctorId,
                email: email,
                appointment_time: props.appointmentTime
            });

            console.log(response.data);
            alert("Subscription successful!");
        } catch (error) {
            console.error("There was an error!", error);
            alert("Subscription failed!");
        }
    };

    return (
        <div className="notification-container">
            <h2 className="notification-title">Me faire notifier en cas de retard</h2>
            <form className="notification-form" onSubmit={handleSubmit}>
                <div className="notification-form-div">
                    <label className="notification-label">Adresse Email:</label>
                    <input
                        type="email"
                        className="notification-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button className="notification-button" type="submit">Confirmer</button>
            </form>
        </div>
    );
};

export default Notification;
