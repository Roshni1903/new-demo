import React from 'react';
import AdminDashboard from '../Teacher/AdminDashboard';
import StudentDashboard from '../Student/StudentDashboard';

export default function Dashboard() {
    const role = localStorage.getItem('role')
    return (
        <div>
            <div style={{ marginLeft: '240px' }}>
                {role === 'teacher' ? <AdminDashboard /> : <StudentDashboard />}
            </div>
        </div>
    );
}
