import React from 'react';
import styles from '../../Styles/About.module.scss';
import Logo from '../../Images/ME.png';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className={styles.content}>
      <div className={styles.content_img_container}>
        <div className={styles.content_img_border}>
          <img className={styles.content_img} src={Logo} alt="Logo"></img>
        </div>
      </div>
      <div className={styles.content_text_container}>
        <h3 className={styles.content_h3}>Hi, my name is</h3>
        <h1 className={styles.content_h1}>Cameron Pelkey</h1>
        <h2 className={styles.content_h2}>Engineering Student</h2>
        <p className={styles.content_p}>Ever since I can remember, I've been fascinated by the art of problem-solving and the science behind how things work. Currently pursuing an engineering degree, I've delved deep into diverse projects that have not only honed my technical skills but have also molded my approach to challenges. From designing intricate simulations to building user-friendly apps, I've embraced every project as an opportunity to grow and innovate. Beyond the classroom, I'm passionate about exploring the intersections of technology, design, and user experience. This portfolio is a testament to my journey thus far, encapsulating the myriad of projects I've undertaken. While I wear many hats as an engineering student, at my core, I'm a perpetual learner with an insatiable curiosity.</p>
        <Link className={styles.content_link} to="/projects">
          <button className={styles.content_button}>Check out my projects!</button>
        </Link>
      </div>
    </div>
  );
}
  
export default About;
  