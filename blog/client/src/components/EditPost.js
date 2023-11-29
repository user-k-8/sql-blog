import React from 'react'
import Navbar from './Navbar'
import { useNavigate, useLocation } from 'react-router-dom';
import {useState} from "react"; 
import Modal from './Modal';

const EditPost = () => {
   const navigate = useNavigate();

   const location = useLocation();
   const {element} = location.state;

   const [modalOpen, setModalOpen] = useState(false);
   const handleModalOpen = (e) => {
     e.preventDefault();
     setModalOpen(true);
   };
   const handleModalClose = () => {
     setModalOpen(false);
   };

   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
   const day = String(currentDate.getDate()).padStart(2, '0');
   const formattedDate = `${year}-${month}-${day}`;

    const [form, setForm] = useState( {
      post_id: element.post_id,
      title: element.title,
      content: element.content, 
      author: element.author,
     published_date: formattedDate,
     user_id: element.user_id,
     views: element.views

  }); 
  
  const handleInputChange = event=>{
  
  const {name, value, type, checked} = event.target
  setForm({...form, [name]:  value})
  }
  
  const handleSubmit = async (e)=>{

     e.preventDefault();

     try {
       const response = await  fetch('https://sql-blog.onrender.com/posts/api/editpost', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
     },
     body: JSON.stringify(form),
      });
     } catch (error) {
       console.error('Error:', error);
     }
     setModalOpen(false);
     alert('Blog post updated!');
     navigate('/')
  
  }
  
    return (
      <div className='create-post-container' id='edit-top'>
           <div>
              <Navbar/>
          </div>
          <div className='post-form-container'>
                <h1>Edit your blog post</h1>
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
                     <p style={{color:"black"}}>Are you sure you want to update this post?</p>
                 </Modal>   
             </form>          
          </div>
      </div>
    
  )
}

export default EditPost