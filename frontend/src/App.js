import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/NavBar";
import Footer from "./component/Footer"
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSection from "./component/HeroSection";
import Blogs from "./component/blogs";

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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
