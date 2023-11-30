import React, { useState , useEffect} from 'react';
import logo from './img/logo2.png'
import  bars from './img/bars.png'
import { HashLink as Link } from 'react-router-hash-link';

const Navbar = () => {

  const mobile = window.innerWidth<=768? true: false;
  const [menuOpened, setMenuOpened] = React.useState(false)

  const storedUser = JSON.parse(localStorage.getItem("blogLogin"));
  const [postPath, setPostPath] =useState('')
  const [path, setPath]= useState('')

  useEffect(()=>{
    if(storedUser){
      setPostPath('/addpost')
      setPath('/')
    }
    else{
      setPath('/login')
    }
  },[])

const checkLogin= ()=>{
    if(!storedUser){
      alert('You are not signed in! Log in to create post') 
    }
    else{
      setPostPath('/addpost')
    }
}


const handleLogInOut =()=>{
    
     if(storedUser){
      localStorage.removeItem("blogLogin")
     }
     else{
     setPath('/login')
      
     }
}
return (
    <div className='nav-container' >
        <div className='logo-container'>
                 <img src={logo} alt=''  className='logo'/>
                 <span>Melsoft Academy</span>
        </div>
        {menuOpened==false && mobile==true?
        ( <div onClick={()=>{setMenuOpened(true)}}>
          <img src={bars} alt='' style={{width:'1.5rem', height:'1.5rem'}} className='bars'/>
        </div>) : (
           <div className='nav-elements'>
              <button 
              className='blog-btn' 
              style={{width:'fit-content' , display: window.innerWidth<'769' ? 'block' : 'none'}}
              onClick={()=>{setMenuOpened(false)}}> ✖ Close</button>
              
             <div><Link to= {{pathname:'/', hash: "top"}} className='nav-txt'>Blog</Link></div>
             <div><Link to= {{pathname:`/register`, hash: "register-top"}}  className='nav-txt'>Register</Link></div>
             <div><Link to= {{pathname:path, hash: "login-top"}}  className='nav-txt' onClick={handleLogInOut}>{storedUser ? "Logout" : "Login"}</Link></div>
             <div><Link to= {{pathname:postPath, hash: "create-top"}} className='nav-txt' onClick={checkLogin}>Create-post</Link></div>
           </div>)}
    </div>
  )
}

export default Navbar