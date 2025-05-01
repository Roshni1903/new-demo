// import React from 'react';
// import StudentDashboard from '../Student/StudentDashboard/StudentDashboard';
// import AdminDashboard from '../Teacher/AdminDashboard/AdminDashboard';
// import {useNavigate} from "react-router-dom"
// export default function Dashboard() {
//     const role = localStorage.getItem('role')
//     return (
//         <div>
//             <div style={{ marginLeft: '240px' }}>
//                 {role === 'teacher' ? <AdminDashboard /> : <StudentDashboard />}
//             </div>
//         </div>
//     );
// }
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (!role) {
            return <Navigate to="/login" />;
        }
    }, [role]);

    if (role === "teacher") {
        return <Navigate to="/teacher/dashboard" />;
    } else if (role === "student") {
        return <Navigate to="/student/dashboard" />;
    }

    return <Navigate to="/login" />;
};

export default Dashboard;


