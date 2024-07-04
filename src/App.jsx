import React from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import AdminDashboard from './pages/admin-dashboard/adminDashboard';
import LoginPage from './pages/Login';
import RequireAuth from './context/requireAuth';

function App() {
    return (
        <BrowserRouter basename="/">
            <div className="h-[100vh] w-full">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<RequireAuth allowedRoles={['admin']} />}>
                        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
                    </Route>
                    {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
