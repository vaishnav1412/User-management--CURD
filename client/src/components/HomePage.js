import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import "./HomePage.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState();

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/login");
    localStorage.removeItem("token");
  };

  const getdata = async () => {
    try {
      
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="home-container-left">
          <div className="side-nav">
            <div className="logo">
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="nav-lists">
              <Link
                to="/"
                className={
                  location.pathname === "/homePage"
                    ? "nav-list active-nav-list"
                    : "nav-list"
                }
              >
                Home
              </Link>

              <Link
                to="/user-profile"
                className={
                  location.pathname === "/user-profile"
                    ? "nav-list active-nav-list"
                    : "nav-list"
                }
              >
                User Profile
              </Link>
              <Link className="nav-list" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </div>
        </div>
        <div className="home-container-right">
          <div className="main-container">
            <h1>Home page</h1>
            <p>Welcome back {data?.name}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
