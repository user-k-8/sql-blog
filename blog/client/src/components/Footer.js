import React from 'react'
import logo from './img/logo2.png'
const Footer = () => {
  return (
    <div>
    <hr className='footer-line'/>
    <footer className='footer-container white'>
         <div className='footer-logo'>
               <img src={logo} alt=''/>
         </div>
         <div className='quick-links footer-col'>
            <h3>Quick Links</h3>
           <span>Home</span>
           <span>About Us</span>
           <span>Blog</span>
           <span>Register</span>
           <span>Create post</span>
         </div>
         <div className='services footer-col'>
               <h3>Services</h3>
               <span>Bootcamps</span>
               <span>Sponsor</span>
               <span>Fundraise</span>
               <span>Volunteer</span>
         </div>
         <div className='contact footer-col'>
                <h3>Contact</h3>
                <span>+27 82 456 8722</span>
                <span>hello@melsoftacademy.com</span>               
         </div>
    </footer>
    </div>
  )
}

export default Footer