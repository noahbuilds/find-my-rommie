import React, { useState } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = (props: any) => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const showCollapse = () => {
    document.getElementById("mainNavItems")?.classList.toggle("collapse");
  };
  return (
    <>
    <div className="d-flex justify-content-end text-end">
    <nav className="navbar nav  spnav navbar-expand-lg navbar-dark bg-dark ">
        <a className="navbar-brand" href="/">
          {/* <img src="/assets/RFA (2).png"  height="50"/> */}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mainNavItems"
          aria-controls="mainNavItems"
          aria-label="Toggle main menu"
          aria-expanded="false"
          onClick={showCollapse}
        >
          <i className="fa fa-bars"></i>
        </button>
        <div
          className={` collapse blurred   navbar-collapse ml-auto`}
          id="mainNavItems"
        >
          <div className="ml-auto navbar-nav nav">
            <a className="nav-item nav-link mx-1" href="/">
              Home
            </a>
            <a className="nav-item nav-link mx-lg-2 mx-1" href="/about">
              Why RoommateFinder?
            </a>
            <a className="nav-item nav-link mx-lg-2 mx-1" href="/support">
              Support
            </a>

            {props.token ? (
              <>
                <a className="nav-item nav-link mx-1" href="/dashboard">
                  Dashboard
                </a>
                <a className="nav-item nav-link mx-1 active" href="/profile">
                  Profile
                </a>

                <a
                  onClick={logOut}
                  className="mx-1 btn btn-outline-danger auth-only"
                >
                  Log Out
                </a>
              </>
            ) : (
              <a className="mx-1 btn btn-outline-purple no-auth" href="/login">
                Log In
              </a>
            )}
          </div>
        </div>
      </nav>
    </div>
     
    </>
  );
};

export default NavBar;
