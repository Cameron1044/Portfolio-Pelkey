import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import About from './Components/Pages/About';
import Projects from './Components/Pages/Projects';
import Coursework from './Components/Pages/Coursework';
import Navbar from './Components/Navigation/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{marginTop: '10rem'}}>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/coursework" element={<Coursework />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/" element={<Projects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;