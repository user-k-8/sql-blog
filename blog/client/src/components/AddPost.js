import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import {useState} from "react"; 
import Modal from './Modal';

const AddPost = () => {
  
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const storedUser= JSON.parse(localStorage.getItem("blog2Login"));

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const [form, setForm] = useState({
    title:"",
    content:"", 
    author:"",
   published_date: formattedDate,
   user_id: storedUser.user_id
 }); 

const handleInputChange = event=>{

const {name, value, type, checked} = event.target
setForm({...form, [name]: type==='checkbox' ? checked : value})
}

const handleSubmit = (e)=>{

   e.preventDefault();
//add post
  try {
    const response =  fetch('https://sql-blog.onrender.com/posts/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(form),
    });
    }catch (error) {
      console.error('Error:', error);
  }
  setModalOpen(false);
  alert('Blog post created!');
  navigate('/')

}

const pageScroll=(id)=>{
  const element = document.getElementById(id);
  if (element) {
   element.scrollIntoView({
     behavior: "smooth",
     block: "start",
 });
}}

  return (
    <div className='create-post-container' id='create-top'>
         <div className='create-post-hero'>
            <Navbar/>
            <div className='create-post-hero-text'>
                <h1>Share your <br/> insights</h1>
                <h3>write a blog post<br/> about fascinating tech</h3>
                 <button onClick={()=>{pageScroll('create-posts-top')}} className='hero-btn create-post-hero-btn'>Start writing</button>
            </div>
        </div>
        <div className='post-form-container'  id='createPost'>
              <h1 id='create-posts-top'>Create a blog post</h1>
              <form onSubmit={handleModalOpen}>
                  <div className="form-row">
                     <div>
                        <label htmlFor="author">Full Name <span className="star">*</span></label>
                        <br/><br/>
                        <input type="text" id="author" name="author" value={form.author}  onChange={handleInputChange} className='post-input' required/>     
                     </div>      
                  </div>
                  <div className="userName form-row">
                     <label htmlFor="title">Blog Title <span className="star">*</span></label>
                     <input type="text" id="title" name="title" value={form.title} onChange={handleInputChange} className='post-input' required/>       
                  </div>
                  <div className="post form-row">
                     <label htmlFor="content">Blog Post <span className="star">*</span></label>
                     <br/><br/>
                     <textarea type="text" id="content" name="content" value={form.content} className='blog-post-input' onChange={handleInputChange} />
                  </div>
                  <br/>
                 <input type='submit' value="Submit" className='blog-btn'/>
                 <Modal isOpen={modalOpen} onClose={handleModalClose} handleSubmit={handleSubmit}>
                     <p style={{color:"black"}}>Are you sure you want to create this post?</p>
                 </Modal>   
             </form> 
         </div>
    </div>
  )
}

export default AddPost