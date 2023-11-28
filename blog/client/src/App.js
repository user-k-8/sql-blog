import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Blog from "./components/Blog";
import ViewPost from "./components/ViewPost";
import AddPost from "./components/AddPost";
import Login from "./components/Login";
import Register from "./components/Register"
import EditPost from "./components/EditPost";

function App() {
  return (
        
          <Router>
               <Routes>                
                  <Route exact path="/" element={<Blog/>}/>
                  <Route exact path ="/viewpost" element={<ViewPost/>}/>
                  <Route exact path = "/addpost" element={<AddPost/>} />
                  <Route exact path = "/login" element={<Login/>} />
                  <Route exact path = "/register" element={<Register/>} />
                   <Route exact path="/editpost" element={<EditPost/>}/>
               </Routes>       
          </Router>
        
  )
}

export default App;
