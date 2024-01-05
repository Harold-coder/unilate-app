import React, { useEffect, useState } from "react";
import Axios from "axios";
import Card from './Card';
import { urlServer } from '../../App';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [doctors, setDoctors] = useState([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 270);

    useEffect(() => {
        if (debouncedSearchTerm) {
            searchDoctors(debouncedSearchTerm);
        } else {
            fetchRandomDoctors();
        }
    }, [debouncedSearchTerm]);

    const fetchRandomDoctors = () => {
        Axios.get(`${urlServer}doctors/all`)
            .then(response => {
                const fetchedDoctors = response.data.doctors;
                setDoctors(selectRandomDoctors(fetchedDoctors, 3));
            })
            .catch(error => console.error('Error fetching doctors:', error));
    };

    const selectRandomDoctors = (doctorsList, count) => {
        const randomDoctors = [];
        while (randomDoctors.length < count && randomDoctors.length !== doctorsList.length) {
            const randomIndex = Math.floor(Math.random() * doctorsList.length);
            if (!randomDoctors.includes(doctorsList[randomIndex])) {
                randomDoctors.push(doctorsList[randomIndex]);
            }
        }
        return randomDoctors;
    };

    const searchDoctors = searchTerm => {
        Axios.get(`${urlServer}doctors`, { params: { search: searchTerm } })
            .then(response => setDoctors(response.data.doctors))
            .catch(error => console.error('Error searching for doctors:', error));
    };

    const renderDoctors = () => {
        return doctors.slice(0, 3).map(doctor => (
            <Card 
                key={doctor.id}
                id={doctor.id}
                picture={doctor.picture+".png"}
                name={doctor.name}
                city={doctor.city}
                specialty={capitalizeFirstLetter(doctor.specialty)}
            />
        ));
    };

    const capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="input-area">
            <input 
                className="search" 
                type="text" 
                placeholder="Rechercher votre médecin" 
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='cards'>
                {renderDoctors()}
            </div>
        </div>
    );
}
