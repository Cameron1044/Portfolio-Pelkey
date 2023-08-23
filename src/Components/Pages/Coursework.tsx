import React, {useState, useEffect} from 'react';
import styles from '../../Styles/Coursework.module.scss';
import courseDataCompleted from '../Data/courseworkCompleted.json';
import courseDataProgress from '../Data/courseworkProgress.json';

// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { FaSquareRootAlt, FaMagnet, FaBook, FaRocket, FaCode } from 'react-icons/fa';

type CourseCategory = "Math" | "Physics" | "Coding" | "Humanities" | "Aerospace";

const IconMap: Record<CourseCategory, JSX.Element> = {
  "Math": <FaSquareRootAlt className={styles.icon}/>,
  "Physics": <FaMagnet className={styles.icon}/>,
  "Coding": <FaCode className={styles.icon}/>,
  "Humanities": <FaBook className={styles.icon}/>,
  "Aerospace": <FaRocket className={styles.icon}/>
};

interface Course {
  id: number;
  title: string;
  code: string;
  category: CourseCategory;
}

function Coursework() {
  const [coursesC, setCoursesC] = useState<Course[]>([]);
  const [coursesP, setCoursesP] = useState<Course[]>([]);

  useEffect(() => {
    setCoursesC(courseDataCompleted as Course[]);
    setCoursesP(courseDataProgress as Course[]);

  }, []);

  return (
    <>
    <div className={styles.coursework_container}>
      <h1 className={styles.coursework_h1}>Completed Coursework</h1>
      <div className={styles.coursework_grid}>
        {coursesC.map(course => (
          <div className={styles.coursework_card} key={course.id}>
            <div className={styles.coursework_card_icon}>
              {IconMap[course.category]}
            </div>
            <div className={styles.coursework_card_content}>
              <h1 className={styles.coursework_card_content_h1}>{course.code}</h1>
              <h2 className={styles.coursework_card_content_h2}>{course.title}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.coursework_divider}/>
    </div>
    <div className={styles.coursework_container}>
      <h1 className={styles.coursework_h1}>In-Progress Coursework</h1>
      <div className={styles.coursework_grid}>
        {coursesP.map(course => (
          <div className={styles.coursework_card} key={course.id}>
            <div className={styles.coursework_card_icon}>
              {IconMap[course.category]}
            </div>
            <div className={styles.coursework_card_content}>
              <h1 className={styles.coursework_card_content_h1}>{course.code}</h1>
              <h2 className={styles.coursework_card_content_h2}>{course.title}</h2>
            </div>
        </div>
        ))}
      </div>
    </div>
    </>
  );
}
  
export default Coursework;
  