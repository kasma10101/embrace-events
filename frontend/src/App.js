import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/NavBar";
import Footer from "./component/Footer"
import 'bootstrap/dist/css/bootstrap.min.css';
import Blogs from "./component/blogs";
import EachBlog from "./component/eachBlog";
import Home from "./component/home";
import About from "./component/About";
import Contact from "./component/Contact";
import Ticket from "./component/Ticket";
import PaymentSuccess from "./component/PaymentSuccess";
import PaymentComponent from "./component/Payment";

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
        <Route path="/tickets" element={<Ticket />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment" element={<PaymentComponent />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
