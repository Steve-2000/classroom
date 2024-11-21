import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './AdminDashboard.css';

const allowedEmails = ['itt2021024@tec.rjt.ac.lk']; // List of allowed admin emails

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [isAllowed, setIsAllowed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser && allowedEmails.includes(currentUser.email)) {
                setUser(currentUser);
                setIsAllowed(true);
            } else {
                setIsAllowed(false);
                navigate('/unauthorized'); // Redirect to an unauthorized page if needed
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    if (!isAllowed) {
        return <p>Loading...</p>;
    }

    return (
        <div className="admin-dashboard">
            <h1>Admin Operations</h1>
            <div className="operation-links">
                <Link to="/admin/updateresult">Update Results Marks</Link>
                <Link to="/admin/addadmin">Add More Admins</Link>
                <Link to="/admin/managesubject">Manage Subjects</Link>
                <Link to="/admin/upload">upload pastpapers</Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
