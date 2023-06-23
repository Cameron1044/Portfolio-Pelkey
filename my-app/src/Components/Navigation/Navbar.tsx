import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Styles/Navbar.module.scss'
import { FaTimes, FaBars } from 'react-icons/fa';
import Logo from '../../Images/ME.png';

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);

  const showNavbar = () => {
    navRef.current?.classList.toggle(styles['responsive-nav']);
  }

  return (
    <header>
      <img src={Logo} alt="Logo" />
      <nav ref={navRef}>
        <ul>
          <li onClick={showNavbar}><Link to="/">Home</Link></li>
          <li onClick={showNavbar}><Link to="/projects">Projects</Link></li>
          <li onClick={showNavbar}><Link to="/about">About</Link></li>
          {/* More links as needed */}
        </ul>
        <button className={`${styles['nav-btn']} ${styles['nav-close-btn']}`} onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className={styles['nav-btn']} onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};

export default Navbar;
