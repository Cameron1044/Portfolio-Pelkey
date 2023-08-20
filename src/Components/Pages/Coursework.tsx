import React, {useState, useEffect} from 'react';
import styles from '../../Styles/Coursework.module.scss';
import courseDataCompleted from '../Data/courseworkCompleted.json';
import courseDataProgress from '../Data/courseworkProgress.json';

interface Course {
  id: number;
  title: string;
  code: string;
}

function Coursework() {
  const [coursesC, setCoursesC] = useState<Course[]>([]);
  const [coursesP, setCoursesP] = useState<Course[]>([]);

  useEffect(() => {
    setCoursesC(courseDataCompleted as Course[]);
    setCoursesP(courseDataProgress as Course[]);

  }, []);

  return (
    <body>
      <div className={styles.container}>
        <div className={styles.courseworkContainer}>
          <h1>Completed</h1>
          <div className={styles.pContainer}>
            {coursesC.map(course => (
              <p key={course.id}>{course.code}: {course.title}</p>
            ))}
          </div>
        </div>
        <div className={styles.courseworkContainer}>
          <h1>In Progress</h1>
          {coursesP.map(course => (
            <p key={course.id}>{course.title}</p>
          ))}
        </div>
      </div>
    </body>
  );
}
  
export default Coursework;
  