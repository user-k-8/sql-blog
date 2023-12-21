import React, { useContext, useState } from 'react'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {ThreeDots} from 'react-loader-spinner'

const Login = () => {
    
  const navigate = useNavigate();

    const [form, setForm] = useState( {
        email:"",
       password:"",   
    }); 
     
const handleInputChange = event=>{

    const {name, value, type, checked} = event.target
    setForm({...form, [name]: type==='checkbox' ? checked : value})

  }

const [loading, setLoading] = useState(false)
    
const handleSubmit =  (event)=>{
    event.preventDefault()
    setLoading(true);

fetch('https://sql-blog.onrender.com/api/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
})
.then(response => response.json())
.then(data => {
  setLoading(false)
    // response data
    console.log('Response from server:', data);
    if(data.status=="404"){
      alert('Account does not exist! Enter correct email or register for an account')
    }
   else if(data.status=="401"){
      alert('Password invalid!')
    }
    else{
      alert('Login successful!');
      localStorage.setItem("user", JSON.stringify(data))
      navigate('/')   
    }
})
.catch(error => {
    console.log('Error:', error);
});
}
  return (
<div id='login-top'>
    <Navbar/>
    <div className='post-form-container login-container'>
              <h1 className='login-heading'>Login to your account</h1>
              <Link to="/register"><button className='blog-btn' >Don't have an account? Register ▶</button></Link>
              <form onSubmit={handleSubmit}>
                <div className="name-container form-row">
                  <div>
                     <label htmlFor="email">Email<span className="star">*</span></label>
                     <input type="email" id="email" name="email" value={form.email}  onChange={handleInputChange} className='post-input'   required/>     
                   </div>      
                 </div>
                 <div className="userPassword form-row">
                   <label htmlFor="password">Password <span className="star">*</span></label>
                   <input type="password" id="password" name="password" value={form.password} className='post-input'  onChange={handleInputChange}/>
                 </div>
                 <br/>
                 <div className='loader'>
                          {loading && <ThreeDots 
                                       height="90"
                                       width="120" 
                                       radius="9"
                                       color="white" 
                                       ariaLabel="three-dots-loading"
                                       wrapperStyle={{}}
                                       wrapperClassName="" 
                                       visible={true}  />}
                </div>
                 <input type="submit" value="Submit" className='blog-btn' />    
              </form>
    </div>
</div>
  )
}

export default Login