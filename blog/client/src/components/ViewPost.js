import Navbar from './Navbar'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Comments from './Comments';
import Footer from './Footer';
import img1 from './img/c.jpg'
import img2 from './img/a.jpg'
import { useEffect, useState } from 'react';
import Modal from './Modal';

const ViewPost = () => {

  const navigate = useNavigate()

  const location = useLocation();
  const {element} = location.state;

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const originalDate = new Date(element.published_date);
  const formattedDate =  originalDate.toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})

  const arr = element.content.split('.');
  const firsthalfIndex= arr.length/2
  const section1 = arr.slice(0,firsthalfIndex).join('.')
  const section2= arr.slice(firsthalfIndex,arr.length).join('.');
  const storedUser= JSON.parse(localStorage.getItem("blogLogin"));

  const handleDelete =()=>{

    try {
      console.log(element)
      const response =  fetch('http://localhost:4000/posts/api/deletePost', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(element),
      });
      console.log('data deleted');
  
    } catch (error) {
      console.error('Error deleting data:', error);
    }
    setModalOpen(false);
    alert('Blog post deleted!');
    navigate('/')
}

const [views, setViews] = useState("");
const eyeIcon = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
<path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
</svg>)

 useEffect(()=>{

  fetch('http://localhost:4000/posts/api/views', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
   },
    body: JSON.stringify({post_id: element.post_id})
  })
  .then(response => response.json())
  .then(data => {
   //  response data 
   console.log(data)
   setViews(data[0].views)
  })
  .catch(error => {
  console.error('Error:', error);
 });
 },[])
  return (
    
    <div className='view-post-container'  id='view-top'>
        <Navbar/>
        <div className='view-post-wrapper'>
            
            <h1>{element.title}</h1>
            <button className='blog-btn' >{eyeIcon} {views} views </button>
            <h3>Written by : {element.author}</h3>
            <h3>Date : {formattedDate}</h3>

            <div className='edit-btns' style={{display: storedUser ? storedUser.user_id == element.user_id ? "flex" : "none":"none" }}>
               <Link to="/editpost" state={{element}}> <button className='blog-btn' >Edit </button></Link>
               <br/>
               <button className='blog-btn delete-btn' onClick={handleModalOpen} >Delete</button>
               
               <Modal isOpen={modalOpen} onClose={handleModalClose} handleSubmit={handleDelete}>
                 <p style={{color:"black"}}>Are you sure you want to delete this post?</p>
               </Modal>   
             </div>

             <p className='post-content'>  
               <img src={img1} alt='' className='view-post-img1'/>
               <span >{section1}</span>     
            </p>

            <p className='post-content'>       
              <img src={img2} alt='' className='view-post-img2'/>
              <span >{section2}</span>    
            </p>

        </div>
        <br/>
        <div className='view-post-comments'>
           <Comments item={element}/>
        </div>
        <Footer/>
    </div>
  )
}

export default ViewPost