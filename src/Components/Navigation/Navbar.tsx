import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Styles/Navbar.module.scss';
import { FaTimes, FaBars } from 'react-icons/fa';
// import Logo from '../../Images/ME.png';

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const showNavbar = () => {
    navRef.current?.classList.toggle(styles['responsive-nav']);
  }

  const closeNavbar = () => {
    navRef.current?.classList.remove(styles['responsive-nav']);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Adjust this value as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={isScrolled ? styles.shrunkenNavbar : ''}>
      {/* ... */}
      <nav ref={navRef}>
        <ul>
          <li onClick={closeNavbar}><Link to="/">About</Link></li>
          <li onClick={closeNavbar}><Link to="/projects">Projects</Link></li>
          <li onClick={closeNavbar}><Link to="/coursework">Coursework</Link></li>
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
