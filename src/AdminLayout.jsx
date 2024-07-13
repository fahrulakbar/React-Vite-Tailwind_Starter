import React from 'react';

const AdminLayout = ({ children }) => {
    return (
        <div className="admin-layout h-[100vh] w-full">
            {children}
        </div>
    );
}

export default AdminLayout;
