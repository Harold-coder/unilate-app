import React, { useState } from 'react';
import axios from 'axios';
import { urlServer } from "../../App";
import './notification.css'; // Adjust the path if necessary


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

            // Handle response here (e.g., show success message)
            console.log(response.data);
            alert("Subscription successful!");
        } catch (error) {
            // Handle error here (e.g., show error message)
            console.error("There was an error!", error);
            alert("Subscription failed!");
        }
    };

    return (
        <div className="container">
            <h2>Me faire notifier en cas de retard</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Addresse Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
                <button type="submit">Confirmer</button>
            </form>
        </div>

    );
};

export default Notification;
