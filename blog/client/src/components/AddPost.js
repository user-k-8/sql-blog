import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import {useState} from "react"; 
import Modal from './Modal';
import {ThreeDots} from 'react-loader-spinner'

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
   user_id: storedUser.user_id,
   image_1:"",
   image_2:""
 }); 

 const [selectedFiles1, setSelectedFiles1] = useState(null);
const [selectedFiles2, setSelectedFiles2] = useState(null);

const handleInputChange = event=>{

const {name, value, type, checked} = event.target
setForm({...form, [name]: type==='checkbox' ? checked : value})
}



const uploadFile = async (file )=>{

  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'images_preset')
    let cloudName = process.env.cloudName;
    let resourceType = 'image';
    let api = `https://api.cloudinary.com/v1_1/dsjpexdie/image/upload`


    try{
        const response = await fetch('https://api.cloudinary.com/v1_1/dsjpexdie/image/upload', {
          method: 'POST',
          body: data
        })

        const responseData = await response.json()
        console.log(responseData)
        return responseData.secure_url
    }
    catch(err){
        console.log(err)
        return null
    }

}

const [loading, setLoading] = useState(false)

const handleSubmit = async (e)=>{

  e.preventDefault();

  setModalOpen(false);
  setLoading(true)
 const image_1Url = await uploadFile( selectedFiles1)
 const image_2Url = await uploadFile(selectedFiles2 )

  if(image_1Url && image_2Url){

    const updatedForm = {...form, image_1: String(image_1Url), image_2: String(image_2Url) }

     fetch('http://localhost:4000/posts/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(updatedForm),
    }).then(response=>response.json())
    .then(data => {
      setLoading(false)
      console.log(data)
      alert('Blog post created!');
      navigate('/')
    })
    .catch(error => console.log(error));
  }

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
                  <div className='form-row'>
                     <label htmlFor='image_1'>Upload Image 1 <span className="star">*</span></label>
                     <br/><br/>
                     <input  type='file' name='images' id='image_1' placeholder='Upload Image' onChange={(e) => setSelectedFiles1(e.target.files[0])} className='post-input' required/>
                  </div>   
            <div className='form-row'>
                 <label htmlFor='image_2'>Upload Image 2 <span className="star">*</span></label>
                 <br/><br/>
                <input  type='file' name='images' id='image_2' placeholder='Upload Image' onChange={(e) => setSelectedFiles2(e.target.files[0])} className='post-input' />
            </div>   
                  <div className="post form-row">
                     <label htmlFor="content">Blog Post <span className="star">*</span></label>
                     <br/><br/>
                     <textarea type="text" id="content" name="content" value={form.content} className='blog-post-input' onChange={handleInputChange} />
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
                 <input  type='submit' value="Submit" className='blog-btn'/>
                 <Modal isOpen={modalOpen} onClose={handleModalClose} handleSubmit={handleSubmit}>
                     <p style={{color:"black"}}>Are you sure you want to create this post?</p>
                 </Modal>   
             </form> 
            
         </div>
    </div>
  )
}

export default AddPost