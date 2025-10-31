import "./App.css";
import "./Assets/Style/Pages/Style.css";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import WriteBlog from "./Pages/WriteBlog";
import UpdateBlog from "./Pages/UpdateBlog";
import MyBlogs from "./Pages/MyBlogs";
import Unreviewed from "./Pages/UnreviewedBlogs";
import ReportedBlogs from "./Pages/ReportedBlogs";
import Error from "./Pages/Error";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState({});
  
  useEffect(() => {
    setUserLoggedIn(JSON.parse(localStorage.getItem("user")));
  }, [setUserLoggedIn]);

  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setUserLoggedIn={setUserLoggedIn} />}
          />
          <Route path="/signup" element={<Signup />} />
          {userLoggedIn ? (
            <>
              {userLoggedIn?.role === "ADMIN" ? (
                <>
                  <Route path="/unreviewed" element={<Unreviewed />} />
                  <Route path="/reported" element={<ReportedBlogs />} />
                  <Route path="*" element={<Error />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/writeblog" element={<WriteBlog />} />
                  <Route path="/updateblog/:blogId" element={<UpdateBlog />} />
                  <Route path="/myblogs" element={<MyBlogs />} />
                  <Route path="/*" element={<Error />} />
                </>
              )}
            </>
          ) : (
            <Route path="/*" element={<Login />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
