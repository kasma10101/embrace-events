import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/NavBar";
import Footer from "./component/Footer"
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSection from "./component/HeroSection";
import Blogs from "./component/blogs";
import AddBlog from "./component/addBlog";
import Login from "./component/login";
import Signup from "./component/signup";
import EachBlog from "./component/eachBlog";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
          </>
        } />
        <Route path="/blogs" element={<Blogs />} />
        <Route path='/blogs/:id' element={<EachBlog />} />
        <Route path="/addBlogs" element={<AddBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
