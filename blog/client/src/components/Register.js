import React from 'react'
import Navbar from './Navbar';
import { useNavigate, Link } from 'react-router-dom';
import {ThreeDots} from 'react-loader-spinner'

const Register = () => {
    
    const navigate = useNavigate();

    const [form, setForm] = React.useState( {
      username:"",
      email:"",
      password:""
      
    }); 
    
    const handleInputChange = event=>{
    
    const {name, value, type, checked} = event.target
    setForm({...form, [name]: type==='checkbox' ? checked : value})
    }

  const [loading, setLoading] = useState(false)
      
  const handleSubmit =  (event)=>{
   
    event.preventDefault();
    setLoading(true)
fetch('https://sql-blog.onrender.com/api/register', {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
      })
     .then(response => {
      setLoading(false)
      //  response data from the server
     console.log('server response', response.status)
     if(response.status==409){
     alert('Email already registered')
     }
    else{
      alert('Registration successful!');
      navigate('/login')    
    }})
    .catch(error => {
    console.error('Error:', error);
    });
 }

 
 
  return (
<div id='register-top' >
    <Navbar/>
    <div className='post-form-container login-container'>
              <h1 className='login-heading'>Register for an account</h1>
              <Link to="/login"><button className='blog-btn' >Have an account? Login ▶</button></Link>
              <form onSubmit={handleSubmit}>
                 <div className="name-container form-row">
                   <div>
                     <label htmlFor="username">Full Name<span className="star">*</span></label>
                     <input type="text" id="username" name="username" value={form.username}  onChange={handleInputChange} className='post-input'   required/>     
                   </div>      
                 </div>
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

export default Register