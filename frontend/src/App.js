import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Components/HomePage/HomePage'; 
import ProductPage from './Components/ProductPage/ProductPage';
import ServicePage  from './Components/ServicePage/ServicePage';
import BookingPage from './Components/BookingPage/BookingPage'; 
import AboutUsPage from './Components/AboutUsPage/AboutUsPage'; 
import UserInfo from './Components/UserInfo/UserInfo';
import { AuthProvider } from './Components/AuthContext/AuthContext';
import Admin from './Components/Admin/Admin';
import Footer from './Components/Footer/Footer';


const App = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('current_theme');
    return savedTheme || 'light'; 
  });

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);
  
  

  return (
    <Router>
      <AuthProvider>      
      <div className={`container ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductPage theme={theme} />} />
          <Route path="/servicios" element={<ServicePage theme={theme} />} />
          <Route path="/reservas" element={<BookingPage />} />
          <Route path="/quienes-somos" element={<AboutUsPage />} />
          <Route path="/administracion" element={<Admin />} />
          <Route path="/user-info" element={<UserInfo />} />
          
                  </Routes>
                  <Footer />
      </div>
      </AuthProvider>

    </Router>
  );
};

export default App;
