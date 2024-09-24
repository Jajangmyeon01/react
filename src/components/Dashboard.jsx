// src/components/Dashboard.jsx

// Add the following imports
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Dashboard = () => {
    const [admins, setAdmins] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [rentalTime, setRentalTime] = useState('');
    const [venue, setVenue] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get('http://localhost/api/v1/dashboard');
                setAdmins(response.data.data);
            } catch (err) {
                setError('Failed to fetch data');
                console.error(err);
            }
        };

        fetchAdmins();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await axios.post('http://localhost/api/v1/reservations', {
                first_name: firstName,
                last_name: lastName,
                email,
                rental_time: rentalTime,
                venue,
                notes,
            });
            setSuccess('Reservation successful');
        } catch (err) {
            setError('Failed to make a reservation');
            console.error(err);
        }
    };

    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <ul>
                {admins.map((admin) => (
                    <li key={admin.id}>
                        {admin.firstName} {admin.lastName} - {admin.status}
                    </li>
                ))}
            </ul>

            <h2>Make a Reservation</h2>
            {success && <div>{success}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="datetime-local"
                    value={rentalTime}
                    onChange={(e) => setRentalTime(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Venue"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
                <button type="submit">Reserve</button>
            </form>
        </div>
    );
};

export default Dashboard;
