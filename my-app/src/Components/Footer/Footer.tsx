import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import './Footer.Module.scss'

const Footer = () => {

  return (
    <footer className='footer'>
      <div className='footer-padding'>
        <div className='footer-links'>
          <div className='footer-links-div'>
            <h4>Resources</h4>
            <Link to='/'><p>Link</p></Link>
            <Link to='/'><p>Link</p></Link>
            <Link to='/'><p>Link</p></Link>
          </div>
          <div className='footer-links-div'>
            <h4>Partners</h4>
            <Link to='/'><p>Link</p></Link>
          </div>
          <div className='footer-links-div'>
            <h4>Company</h4>
            <Link to='/'><p>About</p></Link>
            <Link to='/'><p>Press</p></Link>
            <Link to='/'><p>Career</p></Link>
            <Link to='/'><p>Contact</p></Link>
          </div>
          <div className='footer-links-div'>
            <h4>Socials</h4>
            <div className='social-media'>
              <p><FaFacebookF size={15}/></p>
              <p><FaTwitter size={15} /></p>
              <p><FaLinkedinIn size={15} /></p>
              <p><FaInstagram size={15} /></p>
            </div>
          </div>

          <hr></hr>

          <div className='footer-below'>
            <div className='footer-copyright'>
              <p>
                @{new Date().getFullYear()} MongoStyle. All rights reserved
              </p>
            </div>
            <div className='footer-below-links'>
              <Link to='/'><p>Terms & Conditions</p></Link>
              <Link to='/'>Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;