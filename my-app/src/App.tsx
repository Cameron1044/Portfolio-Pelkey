import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './Components/Pages/Home';
import About from './Components/Pages/About';
import Projects from './Components/Pages/Projects';
import Navbar from './Components/Navigation/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;