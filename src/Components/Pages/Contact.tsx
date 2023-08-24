import React from 'react';
import styles from '../../Styles/Contact.module.scss';
import { SocialIcon } from 'react-social-icons';

function Contact() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Get in Touch!</h1>
      <p className={styles.info}><a href="mailto:cameronpelkey.808@gmail.com" className={styles.link}>cameronpelkey.808@gmail.com</a></p>
      <p className={styles.info}>Boulder, CO</p>

      <div className={styles.socials}>
        <SocialIcon className={styles.icon} style={{width: 60, height: 60}} url="https://www.linkedin.com/in/cameron-pelkey/" fgColor="white"/>
        <SocialIcon className={styles.icon} style={{width: 60, height: 60}} url="https://github.com/Cameron1044" fgColor="white"/>
        <SocialIcon className={styles.icon} style={{width: 60, height: 60}} url="https://discord.com/users/209865377579139073" fgColor="white"/>
      </div>
    </div>
  );
}
  
export default Contact;