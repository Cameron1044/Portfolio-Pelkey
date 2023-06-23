import React, { useState } from 'react';
import styles from '../../Styles/Projects.module.scss';

// Define your project data and its type
interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Project 1',
    image: '../../Images/Project1.png',
    description: 'This is project 1.'
  },
  {
    id: 2,
    title: 'Project 2',
    image: '../../Images/Project1.png',
    description: 'This is project 2.'
  },
  // more projects here...
];

function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  function openProject(project: Project) {
    setSelectedProject(project);
  }

  function closeProject() {
    setSelectedProject(null);
  }

  return (
    <div className={styles['projects']}>
      {projects.map(project => (
        <div key={project.id} className={styles['projectCard']} onClick={() => openProject(project)}>
          <img src={project.image} alt={project.title} />
          <h2>{project.title}</h2>
        </div>
      ))}
      {selectedProject && (
        <div className={styles['projectModal']}>
          <button onClick={closeProject}>Close</button>
          <h2>{selectedProject.title}</h2>
          <p>{selectedProject.description}</p>
        </div>
      )}
    </div>
  );
}

export default Projects;

