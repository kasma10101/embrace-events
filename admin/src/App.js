import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSection from "./component/HeroSection";
import Blogs from "./component/blogs";
import AddBlog from "./component/addBlog";
import Login from "./component/login";
import Signup from "./component/signup";
import EachBlog from "./component/eachBlog";
import { useState } from "react";

function App() {
  
  const [showAddModal, setshowAddModal] = useState(false)
  const [showEditModal, setshowEditModal] = useState(false)
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
          </>
        } />
        <Route path="/blogs" element={<Blogs setshowAddModal={setshowAddModal} setshowEditModal={setshowEditModal} showAddModal={showAddModal} showEditModal={showEditModal} />} >
          <Route path='/blogs/:id' element={<EachBlog setshowEditModal={setshowEditModal}/>} />
          <Route path="/blogs/addBlogs" element={<AddBlog setshowAddModal={setshowAddModal} />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
