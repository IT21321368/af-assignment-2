import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './pages/login';
import RegistrationForm from './pages/registration';
import Home from './pages/homePage';
import PictureOfDay from './pages/apodPage';
import MasRoverPhoto from './pages/masRoverPage';
import EpicImage from './pages/EpicImagesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/apod" element={<PictureOfDay />} />
        <Route path="/MasRoverPhoto" element={<MasRoverPhoto />} />
        <Route path="/EpicImage" element={<EpicImage />} />
      </Routes>
    </Router>
  );
}

export default App;
