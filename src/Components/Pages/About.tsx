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
        <h2 className={styles.content_h2}>Aspiring Aerospace Engineer</h2>
        <p className={styles.content_p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <Link className={styles.content_link} to="/projects">
          <button className={styles.content_button}>Check out my projects!</button>
        </Link>
      </div>
    </div>
  );
}
  
export default About;
  