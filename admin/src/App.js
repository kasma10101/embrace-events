import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Blogs from "./component/blogs";
import AddBlog from "./component/addBlog";
import Login from "./component/login";
import Signup from "./component/signup";
import EachBlog from "./component/eachBlog";
import { useEffect, useState } from "react";
import Profile from "./component/Profile";
import axios from "axios";
import { useCookies } from "react-cookie";

function App() {

  const [showAddModal, setshowAddModal] = useState(false)
  const [showEditModal, setshowEditModal] = useState(false)
  const [adminSignedUp, setAdminSignedUp] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [cookies, setCookies] = useCookies(['token'])

  const fetchAdminSignedUpStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/admin-signed-up')
      setAdminSignedUp(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${cookies.token}`


  const fetchLoggedinStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/logged-in')
      setLoggedIn(true)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAdminSignedUpStatus()
  }, [])
  
  useEffect(()=>{
    fetchLoggedinStatus()
  }, [cookies])

  return (
    <BrowserRouter>
      <Navbar loggedIn={loggedIn}/>
      <Routes>
        <Route path="/" element={<Login setCookies={setCookies} />} />
        {loggedIn && <><Route path="/blogs" element={<Blogs setshowAddModal={setshowAddModal} setshowEditModal={setshowEditModal} showAddModal={showAddModal} showEditModal={showEditModal} />} >
          <Route path='/blogs/:id' element={<EachBlog setshowEditModal={setshowEditModal} />} />
          <Route path="/blogs/addBlogs" element={<AddBlog setshowAddModal={setshowAddModal} />} />
        </Route>
          <Route path="/profile" element={<Profile />} /></>}
        {!adminSignedUp && <Route path="/signup" element={<Signup />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
