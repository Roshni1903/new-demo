import React from 'react';
import SideBar from './SideBar';
import AdminDashboard from '../Teacher/AdminDashboard';
import StudentDashboard from '../Student/StudentDashboard';

export default function Dashboard({ role }) {
    return (
        <div>
            <SideBar role={role} />
            <div style={{ marginLeft: '240px' }}>
                {role === 'teacher' ? <AdminDashboard /> : <StudentDashboard />}
            </div>
        </div>
    );
}
