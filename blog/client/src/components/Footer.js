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
           <div>Home</div>
           <div>About Us</div>
           <div>Blog</div>
           <div>Register</div>
           <div>Create post</div>
         </div>
         <div className='services footer-col'>
               <h3>Services</h3>
               <div>Bootcamps</div>
               <div>Sponsor</div>
               <div>Fundraise</div>
               <div>Volunteer</div>
         </div>
         <div className='contact footer-col'>
                <h3>Contact</h3>
                <div>+27 82 456 8722</div>
                <div>hello@melsoftacademy.com</div>               
         </div>
    </footer>
    </div>
  )
}

export default Footer