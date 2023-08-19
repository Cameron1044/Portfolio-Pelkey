import React, { useState, useEffect, useCallback } from 'react';
import styles from '../../Styles/Projects.module.scss';
import projectData from '../Data/projects.json';

interface Media {
  type: 'image' | 'video';
  src: string;
}

interface Project {
  id: number;
  title: string;
  media: Media[];
  description: string;
}

function Projects() {
  const [closing, setClosing] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  useEffect(() => {
    setProjects(projectData as Project[]);
  }, []);

  function nextImage() {
    console.log("Next image triggered");
    if (selectedProject && currentImageIndex < selectedProject.media.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
    console.log(currentImageIndex)
  }
  
  function prevImage() {
    console.log("Prev image triggered");
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
    console.log(currentImageIndex)
  }

  function startCloseProject() {
    setClosing(true);
  }

  function openProject(project: Project) {
    setSelectedProject(project);
  }

  const closeProject = useCallback(() => {
    if (closing) {
      setSelectedProject(null);
      setCurrentImageIndex(0);
      setClosing(false);
    }
  }, [closing]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && selectedProject) {
        closeProject();
      }
    }
  
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedProject, closeProject]);

  return (
    <div className={styles.projects}>
      {projects.map(project => (
        <div key={project.id} className={styles.projectCard} onClick={() => openProject(project)} role="button" tabIndex={0}>
          <h2>{project.title}</h2>
          <div className={styles.imgContainer}>
            {project.media[0].type === 'image' ? (
              <img src={project.media[0].src} alt={`Slide ${currentImageIndex + 1}`} />
            ) : (
              <video src={project.media[0].src} autoPlay loop muted playsInline />
            )}
          </div>
        </div>
      ))}
      {selectedProject && (
        <>
          <div className={`${styles.overlay} ${closing ? styles.FadeOut : ''}`} onClick={startCloseProject}></div>
          <div className={`${styles.projectModal} ${closing ? styles.bubbleOut : ''}`} onAnimationEnd={closeProject}>
            <button onClick={startCloseProject}>Close</button>
            <h2>{selectedProject.title}</h2>
            <div className={styles.contentContainer}>
              <div className={styles.gallery}>
                {selectedProject.media[currentImageIndex].type === 'image' ? (
                  <img src={selectedProject.media[currentImageIndex].src} alt={`Slide ${currentImageIndex + 1}`}/>
                ) : (
                  <video src={selectedProject.media[currentImageIndex].src} autoPlay loop muted playsInline/>
                )}
                <button onClick={prevImage} disabled={currentImageIndex === 0}>Previous</button>
                <button onClick={nextImage} disabled={currentImageIndex === selectedProject.media.length - 1}>Next</button>
              </div>
              <p>{selectedProject.description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Projects;