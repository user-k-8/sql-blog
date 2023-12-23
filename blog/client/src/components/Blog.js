import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'
import BlogPostCard from './BlogPostCard'
import {ClipLoader} from 'react-spinners';
import Footer from './Footer'
import { HashLink as Link } from 'react-router-hash-link';
const Blog = () => {

  const [backendData, setBackendData] =useState(null)

  const [currentPage, setCurrentPage] = useState(1);
 
useEffect(()=>{

    fetch("https://sql-blog.onrender.com/posts/api/allposts").then(
      response => response.json()
    ).then(
      data=> {
          setBackendData(data)
      }
    ).catch(error => {
      console.error('Error:', error);
  });


}, [])


if(Array.isArray(backendData)){
  console.log(backendData)
  var itemsPerPage = 6;
  var indexOfLastItem = currentPage * itemsPerPage;
  var indexOfFirstItem = indexOfLastItem - itemsPerPage;
  var currentItems = backendData.slice(indexOfFirstItem, indexOfLastItem);
  var maxPages = Math.ceil(backendData.length/itemsPerPage)

}


  const pageScroll=(id)=>{
    const element = document.getElementById(id);
    if (element) {
   element.scrollIntoView({
     behavior: "smooth",
     block: "start",
   });
  }}

  const nextPage = () => {
     if(currentPage<maxPages){
        setCurrentPage(currentPage + 1);
       
     }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)

    }
  }



  return (
    <div className='blog-container' id='top'>
            <div className='blog-hero'>
            <Navbar/>
            <div className='hero-text'>
                <h1>Melsoft <br/> Academy<br/> Blog</h1>
                <h3>read and explore new tech insights</h3> 
               <button className='hero-btn' onClick={()=>{pageScroll('posts-top')}}>Get Started</button>
            </div>
        </div>
        <div className='blog-posts-container'>
            <br/>
            <h1 id='posts-top'>Our blog posts</h1>
            <div className='blog-cards'>
                 {currentItems ? (
                    currentItems.map((item, i)=>(
                   <p key={i}><BlogPostCard element={item}/></p>
                    ))
                    ) :<p className='loading-text' >               
                       Loading...  
                      <ClipLoader color={'white'} size={40}/>
                      </p> }        
            </div>
            <br/>
            <div className='load-buttons-container'>
            <Link smooth  to= {{pathname:'/', hash: "posts-top"}} className='load-btn' onClick={prevPage} style={{display: currentPage === 1  ? "none" :"flex"}}>
               Prev
            </Link>
            <Link smooth  to= {{pathname:'/', hash: "posts-top"}} className='load-btn' onClick={nextPage} style={{display: currentPage===(maxPages)  ? "none" :"flex"}} >
                   Next
            </Link>
        </div>
        </div>
        <Footer/>
    </div>
  )
}


export default Blog