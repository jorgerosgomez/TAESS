import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Components/HomePage/HomePage'; 
import ProductPage from './Components/ProductPage/ProductPage';
import BookingPage from './Components/BookingPage/BookingPage'; 
import AboutUsPage from './Components/AboutUsPage/AboutUsPage'; 

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
      <div className={`container ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductPage />} />
          <Route path="/reservas" element={<BookingPage />} />
          <Route path="/quienes-somos" element={<AboutUsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
