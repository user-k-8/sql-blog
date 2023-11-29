import React from 'react'
import {HashLink as Link} from 'react-router-hash-link';
import img from './img/MA.png'

const BlogPostCard = ({element}) => {

    const handleSelect=()=>{
  
       localStorage.setItem('selectedPost', JSON.stringify(element));

       fetch('https://sql-blog.onrender.com/posts/api/addView', {
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
      })
      .catch(error => {
      console.error('Error:', error);
     });
    }

  const originalDate = new Date(element.published_date);
  const formattedDate =  originalDate.toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})

  return (
<div className='destination-card'>
    <div className='card-image'>
           <img src={img} alt=''/>
    </div>
    <div className='card-text'>
       <h3>{element.author} - <br/> {formattedDate}</h3>
        <p className='center'>{element.title}</p>
        <div className='card-btns'>
           <Link to= {{pathname:`/viewpost`, hash: "view-top"}}  state={{element}} onClick={handleSelect}><button className='blog-btn' >Read More</button></Link>  
        </div>
    </div>
</div>
  )
}

export default BlogPostCard