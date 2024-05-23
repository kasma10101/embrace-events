import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/NavBar";
import Footer from "./component/Footer"
import 'bootstrap/dist/css/bootstrap.min.css';
import Blogs from "./component/Blogs";
import EachBlog from "./component/EachBlog";
import Home from "./component/home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Home />
          </>
        } />
        <Route path="/blogs" element={<Blogs />} >
          <Route path="/blogs/:id" element={<EachBlog />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
