import React, { useContext, useEffect, useState } from 'react';
import { useParams, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from '../../components/admin-navbar/navbar';
import Sidebar from '../../components/admin-sidebar/sidebar';
import Main from '../../components/admin-main/main';
import { Context } from '../../context/index';
import Marketing from '../../components/admin-marketing/marketing';
import { Data } from '../../dates/jummy';

import LembagaCrud from '../../components/lmbg/LembagaCrud';
import PostMain from '../../components/lembaga/PostMain';
import PostForm from '../../components/lembaga/EditModal';
import PostDetail from '../../components/lembaga/PostDetail';
import PengembanganComponent from '../../components/admin-pengembangan/pengembangan_component';

const AdminDashboard = () => {
    const { category } = useParams();
    let cat = Data.find((categ) => categ.url === parseInt(category));

    const { state, dispatch } = useContext(Context);
    const [size, setSize] = useState(1000);

    useEffect(() => {
        const handleResize = (e) => {
            setSize(e.currentTarget.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        size < 768 ? dispatch({ type: 'SET_TOGGLE_NAVBAR', payload: false }) : dispatch({ type: 'SET_TOGGLE_NAVBAR', payload: true });
    }, [size, dispatch]);

    return (
        <div className='bg-slate-50'>
            <div className=""><Navbar /></div>
            <div className="main max-w-[2300px] mt-[76px] flex flex-1 justify-between">
                <Sidebar />
                <div className={`main ${state.toggle ? (state.toggleNavbar ? 'md:ml-[310px]' : 'ml-0') : (state.toggleNavbar ? 'md:ml-[90px]' : 'ml-0')} overflow-auto w-full h-full z-10`}>
                    <Routes>
                        <Route path="main" element={<Main />} />
                        <Route path="marketing" element={<Marketing />} />
                        <Route path="post/*" element={<PostRoutes />} />
                        <Route path="lmbg" element={<LembagaCrud />} />
                        <Route path="pembangunan" element={<PengembanganComponent />} />
                        {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
                    </Routes>
                </div>
            </div>
        </div>
    );
};

const PostRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PostMain />} />
            <Route path="new" element={<PostForm />} />
            <Route path=":slug" element={<PostDetail />} />
            <Route path="edit/:slug" element={<PostForm />} />
        </Routes>
    );
};

export default AdminDashboard;
