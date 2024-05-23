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
import PageNotFound from "./component/pageNotFound";

function App() {

  const [showAddModal, setshowAddModal] = useState(false)
  const [showEditModal, setshowEditModal] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [adminData, setAdminData] = useState(false)
  const [isSignUpAllowed, setIsSignUpAllowed] = useState(false)
  const [equilizer, setEquilizer] = useState(1)
  const token = document.cookie

  .split("; ")
  .find((row) => row.startsWith("token="))
  ?.split("=")[1];

  console.log(token);

  const fetchAdminSignedUpStatus = async () => {
    try {
    
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/admin/adminProfile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = await response.json();
      setAdminData(user)
      if(user?._id){
        setLoggedIn(true)
      }
      else setLoggedIn(false)
    } catch (error) {
      console.log(error);
      setLoggedIn(false)
    }
  }

  const signUpPermission = async () => {
    try {
     
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/api/admin/signUpPermission`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const user = await response.json();
      console.log(user);
      if(user.isAllowed){
        setIsSignUpAllowed(true)
      }
      else{
        setIsSignUpAllowed(false)
      }
      
    } catch (error) {
      console.log(error);
      setIsSignUpAllowed(false)
    }
  }


  useEffect(() => {
    fetchAdminSignedUpStatus()
    signUpPermission()
  }, [])
  

  return (
    <BrowserRouter>
      <Navbar loggedIn={loggedIn}/>
      <Routes>
        {loggedIn?
        <>
          <Route path="/blogs"  element={<Blogs equilizer={equilizer} setEquilizer={setEquilizer} token={token} setshowAddModal={setshowAddModal} setshowEditModal={setshowEditModal} showAddModal={showAddModal} showEditModal={showEditModal} />} >
            <Route path='/blogs/:id' element={<EachBlog equilizer={equilizer} setEquilizer={setEquilizer}  token={token} setshowEditModal={setshowEditModal} />} />
            <Route path="/blogs/addBlogs" element={<AddBlog equilizer={equilizer} setEquilizer={setEquilizer}  token={token} setshowAddModal={setshowAddModal} />} />
          </Route>
          <Route path="/profile" element={<Profile token={token} adminData={adminData} />} />
        
        </> 
       
       :
       <>
          <Route path="/login" element={<Login isSignUpAllowed={isSignUpAllowed} />} />
          {isSignUpAllowed && <Route path="/signup" element={<Signup />} />}
       </>
        }
         <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
