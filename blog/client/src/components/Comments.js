import React, { useState,useEffect} from 'react';
import Modal from './Modal';
import { useLocation } from 'react-router-dom';

const Comments = ({element}) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalOpen2 = (comment) => {
    setModalOpen2(true);
    handleDelete(comment)
  };
  const handleModalClose2 = () => {
    setModalOpen2(false);
  };

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState( {
    comment:"",
}); 

const [comments, setComments] = React.useState([])
const [commentForm, setCommentForm] =useState({commentButton:"Add Comment", formDisplay:"none"})
const [load, setLoad] =React.useState(false)

const handleInputChange = event=>{
const {name, value, type, checked} = event.target
setForm({...form, [name]: type==='checkbox' ? checked : value})

}

useEffect(()=>{
  //fetch comments
  fetch(`https://sql-blog.onrender.com/comments/api/allComments/${element.post_id}`, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    //  response data 
    setComments(data)
  
  })
  .catch(error => {
    console.error('Error:', error);
  });

},[load])



const handleSubmit = (event)=>{

event.preventDefault();
//add comment
fetch(`https://sql-blog.onrender.com/comments/api/addComment/${element.post_id}`, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
      'access-token': storedUser.token
  },
  body: JSON.stringify(form)
})
.then(res=> {
  res.json()
  if(res.status === 401 || res.status === 403){
    alert('Not authenticated. Please log in.')
}})
.then(data => {
  //  response data 
   console.log(data)
   setLoad(prev=> !prev)
})
.catch(error => {
  console.error('Error:', error);
});
setModalOpen(false);
alert('Comment added!');
setCommentForm({commentButton:"Add Comment", formDisplay:"none"});
}

const handleDelete =(comment)=>{
  console.log(comment)
  //delete comment
  fetch(`https://sql-blog.onrender.com/comments/api/deleteComment/${comment.comment_id}`, {
    method: 'DELETE',
    headers: {
       'access-token': storedUser.token
    }
  })
 .then(res=> {
  res.json()
  if(res.status === 401 || res.status === 403){
    alert('Not authenticated. Please log in.')
  }
})
  .then(data => {
    console.log(data)
    setLoad(prev=> !prev)
  })
  .catch(error => {
    console.error('Error:', error);
  });
  setModalOpen2(false);
  alert('Comment deleted!');
}

const handleComment = ()=>{
 
  if(storedUser){
         if(commentForm.commentButton=="Add Comment"){
            setCommentForm({commentButton:"Close", formDisplay:"flex"})
            }
         else{
            setCommentForm({commentButton:"Add Comment", formDisplay:"none"})
           }
 }else{
          alert("You must be logged in to comment!")
  }
}

return (
  <div className='comments-container grey'>
       <h1>Comments</h1>
       <button className='blog-btn' onClick={handleComment}>{commentForm.commentButton}</button>
       <br/><br/>
       <div className='comment-form' style={{display: commentForm.formDisplay}}>
          <div>    
             <div className="comment form-row">
                 <label htmlFor="comment">Comment <span className="star">*</span></label><br/>
                 <textarea type="text" id="comment" name="comment" value={form.post} onChange={handleInputChange} required className='comment-input'/>
             </div>
             <br/>
             <button onClick={handleModalOpen}  className='blog-btn'>Submit</button>
             <Modal isOpen={modalOpen} onClose={handleModalClose} handleSubmit={handleSubmit}>
                <p style={{color:"black"}}>Are you sure you want to add this comment?</p>
             </Modal>
          </div>
       </div>
       {comments.length>0?
         comments.map((comment)=>(
        <div key={comment.comment_id}>
          <div className='comment-wrapper'>
              <h3>{comment.username}</h3>
              <p className='comment-content'>{comment.comment}</p>
              <button onClick={()=>handleModalOpen2(comment)} className='blog-btn'  style={{display: storedUser ? storedUser.user_id ? "flex" : "none":"none" }}  >Delete</button>
              <Modal  isOpen={modalOpen2} onClose={handleModalClose2} >
                 <p style={{color:"black"}}>Are you sure you want to delete this comment?</p>
             </Modal>
          </div>
       </div>
      )) :
          <p className='grey'>No comments</p>
      }
    </div>
  )
}

export default Comments