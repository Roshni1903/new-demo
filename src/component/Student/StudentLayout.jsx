import React from 'react';
import SideBar from "../CommonUser/SideBar"
import { Outlet, Navigate } from 'react-router-dom';

export default function StudentLayout() {
    const role = localStorage.getItem('role');
    if (role !== 'student') return <Navigate to="/unauthorized" />;

    return (
        <div style={{ display: 'flex' }}>
            <SideBar role={role} />
            <main style={{ marginLeft: '40%', padding: '20px' }}>
                <Outlet />
            </main>
        </div>
    );
}
