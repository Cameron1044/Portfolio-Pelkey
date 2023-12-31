import React, {useEffect, useCallback} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import About from './Components/Pages/About';
import Projects from './Components/Pages/Projects';
import Coursework from './Components/Pages/Coursework';
import Navbar from './Components/Navigation/Navbar';
import Contact from './Components/Pages/Contact';

import projectData from './Components/Data/projects.json';
import { preloadMedia } from './Components/Utils/preloadImages';
import styles from './Styles/App.module.scss';

function App() {
  // Extract the thumbnail image URLs from the JSON data
  const thumbnailUrls = projectData.map(project => project.media[0].src);

  const loadFunction = useCallback(async () => {
    try {
      await preloadMedia(thumbnailUrls);
      console.log('All images are loaded');
    } catch (error) {
      console.error((error as Error).message);
    }
  }, [thumbnailUrls]);

  useEffect(() => {
    loadFunction();
  }, [loadFunction]);

  return (
    <Router>
      <Navbar />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/coursework" element={<Coursework />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;