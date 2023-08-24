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
  objective: string;
  results: string;
}
const isWebMSupported = () => {
  const video = document.createElement('video');
  return !!video.canPlayType('video/webm; codecs="vp8, vorbis"');
}  

const VideoPlayer = React.memo(({ source, className }: { source: string, className?: string }) => {
  const supportsWebM = isWebMSupported();  

  return (
    <video className={className} autoPlay loop muted playsInline preload="auto">
      {supportsWebM ? <source src={source.replace('.ext','.webm')} type="video/webm" /> : <source src={source.replace('.ext','.mp4')} type="video/mp4" />}
      Not Supported
    </video>
  );
});

function Projects() {
  const [closing, setClosing] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setProjects(projectData as Project[]);
  }, []);

  const nextImage = useCallback(() => {
    console.log("Next image triggered");
    if (selectedProject && currentImageIndex < selectedProject.media.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  }, [currentImageIndex, selectedProject]);
  
  const prevImage = useCallback(() => {
    console.log("Prev image triggered");
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(selectedProject!.media.length - 1);
    }
  }, [currentImageIndex, selectedProject]);

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

  const VideoGallery = ({ selectedProject, currentImageIndex } : { selectedProject: Project, currentImageIndex: number }) => {
    return (
        <div className={styles.projects_modal_gallery}>
            <div className={styles.projects_modal_gallery_media_container}>
                {selectedProject.media[currentImageIndex].type === 'image' ? (
                    <img className={styles.projects_modal_gallery_media} src={selectedProject.media[currentImageIndex].src} alt={`Slide ${currentImageIndex + 1}`} loading="lazy"/>
                ) : (
                    <VideoPlayer key={selectedProject.media[currentImageIndex].src} className={styles.projects_modal_gallery_media} source={selectedProject.media[currentImageIndex].src}/>
                )}
                {renderPagination(selectedProject)}
            </div>
        </div>
    );
  }
  
  return (
    <div className={styles.projects}>
      {projects.map(project => (
        <div className={styles.projects_card} key={project.id} onClick={() => openProject(project)} role="button" tabIndex={0}>
          <h2 className={styles.projects_card_h2}>{project.title}</h2>
          <div className={styles.projects_card_image_container}>
            {project.media[0].type === 'image' ? (
              <img className={styles.projects_card_media} src={project.media[0].src} alt={`Slide ${currentImageIndex + 1}`} loading="lazy"/>
            ) : (
              <VideoPlayer key={project.media[0].src} className={styles.projects_card_media} source={project.media[0].src}/>
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
              <button className={styles.projects_modal_header_button} onClick={startCloseProject}>
                <FontAwesomeIcon icon={faXmark} className={styles.xIcon}/>
              </button>
            </div>
            <div className={styles.projects_modal_content}>
              <VideoGallery selectedProject={selectedProject} currentImageIndex={currentImageIndex} />
              <div className={styles.projects_modal_content_text_container}>
                <div className={classNames(styles.projects_modal_content_subsection, styles.top)}>
                  <h1 className={styles.projects_modal_content_h1}>Objective</h1>
                  <p className={styles.projects_modal_content_p}>{selectedProject.objective}</p>
                </div>
                <div className={styles.projects_modal_content_subsection}>
                  <h1 className={styles.projects_modal_content_h1}>Results</h1>
                  <p className={styles.projects_modal_content_p}>{selectedProject.results}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Projects;