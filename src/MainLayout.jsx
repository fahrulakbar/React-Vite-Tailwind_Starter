import React from 'react';
import Navbar from './components/home_component/Header/Navbar';
import Footer from './components/home_component/Footer/Footer';
import Popup from './components/home_component/Pop-up';
import ScrollToTop from './scrooltop';

const MainLayout = ({ children }) => {
    return (
        <div>
            <ScrollToTop />
            <Popup />
            <Navbar />
            <div className="content-wrapper h-[100vh] w-full">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default MainLayout;
