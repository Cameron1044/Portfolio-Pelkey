import React, { useState, useEffect, useCallback } from 'react';
import styles from '../../Styles/Projects.module.scss';
import projectData from '../Data/projects.json';
import classNames from 'classnames';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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

  const renderPagination = (selectedProject: Project) => {
    if (selectedProject.media.length > 1) {
      return (
        <div className={styles.projects_modal_gallery_button_container}>
          <button className={classNames(styles.projects_modal_gallery_button, styles.prev)} onClick={prevImage}>
            <FaChevronLeft className={styles.projects_modal_gallery_button_icon}/>
          </button>
          {selectedProject.media.map((_, index) => (
            <div key={index} className={`${styles.projects_modal_gallery_button_pagination} ${currentImageIndex === index ? styles.active : ''}`}/>
          ))}
          <button className={classNames(styles.projects_modal_gallery_button, styles.next)} onClick={nextImage}>
            <FaChevronRight className={styles.projects_modal_gallery_button_icon}/>
          </button>
        </div>
      );
    }
  }
  
  return (
    <body>
      <div className={styles.projects}>
        {projects.map(project => (
          <div className={styles.projects_card} key={project.id} onClick={() => openProject(project)} role="button" tabIndex={0}>
            <h2 className={styles.projects_card_h2}>{project.title}</h2>
            <div className={styles.projects_card_image_container}>
              {project.media[0].type === 'image' ? (
                <img className={styles.projects_card_media} src={project.media[0].src} alt={`Slide ${currentImageIndex + 1}`} />
              ) : (
                <video className={styles.projects_card_media} src={project.media[0].src} autoPlay loop muted playsInline />
              )}
            </div>
          </div>
        ))}
        {selectedProject && (
          <>
            <div className={`${styles.projects_modal_overlay} ${closing ? styles.FadeOut : ''}`} onClick={startCloseProject}></div>
            <div className={`${styles.projects_modal} ${closing ? styles.bubbleOut : ''}`} onAnimationEnd={closeProject}>
              <div className={styles.projects_modal_header}>
                <h2 className={styles.projects_modal_header_h2} >{selectedProject.title}</h2>
                <button className={styles.projects_modal_header_button} onClick={startCloseProject}><FontAwesomeIcon icon={faXmark} className={styles.xIcon}/></button>
              </div>
              <div className={styles.projects_modal_content}>
                <div className={styles.projects_modal_gallery}>
                  <div className={styles.projects_modal_gallery_media_container}>
                    {selectedProject.media[currentImageIndex].type === 'image' ? (
                      <img className={styles.projects_modal_gallery_media} src={selectedProject.media[currentImageIndex].src} alt={`Slide ${currentImageIndex + 1}`}/>
                    ) : (
                      <video className={styles.projects_modal_gallery_media} src={selectedProject.media[currentImageIndex].src} autoPlay loop muted playsInline/>
                    )}
                    {renderPagination(selectedProject)}
                  </div>
                </div>
                <div className={styles.projects_modal_content_text_container}>
                  <div className={classNames(styles.projects_modal_content_subsection, styles.top)}>
                    <h1 className={styles.projects_modal_content_h1}>Objective</h1>
                    <p className={styles.projects_modal_content_p}>{selectedProject.description}</p>
                  </div>
                  <div className={styles.projects_modal_content_subsection}>
                    <h1 className={styles.projects_modal_content_h1}>Results</h1>
                    <p className={styles.projects_modal_content_p}>{selectedProject.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </body>
  );
}

export default Projects;