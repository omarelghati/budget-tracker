import React from "react";
import "../../assets/css/sidebar.css";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";

const Side = () => {
  const token = localStorage.token;
  const loggedIn = useSelector((state) => state.user.loggedIn) || token;
  return (
    <nav className="navbar navbar-light navbar-expand-md navigation-clean-button">
      <div className="container">
        <NavLink
          activeClassName="somethinelse"
          className="navbar-brand"
          to="/dashboard"
        >
          Budget Tracker
        </NavLink>
        <button
          data-toggle="collapse"
          className="navbar-toggler"
          data-target="#navcol-1"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="nav navbar-nav mr-auto">
            <li className="nav-item">
              {loggedIn && (
                <NavLink
                  to="/dashboard"
                  activeClassName="active"
                  className="btn action-button"
                >
                  Dashboard
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {loggedIn && (
                <NavLink
                  to="/transactions"
                  activeClassName="active"
                  className="btn action-button"
                >
                  My transactions
                </NavLink>
              )}
            </li>
            <li className="nav-item dropdown">
              <a
                className="dropdown-toggle nav-link"
                data-toggle="dropdown"
                aria-expanded="false"
                href="#"
              >
                Dropdown{" "}
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  First Item
                </a>
                <a className="dropdown-item" href="#">
                  Second Item
                </a>
                <a className="dropdown-item" href="#">
                  Third Item
                </a>
              </div>
            </li>
          </ul>
          <span className="navbar-text actions">
            {!loggedIn && (
              <NavLink
                to="/login"
                activeClassName="active"
                className="btn action-button"
              >
                Login
              </NavLink>
            )}
            {!loggedIn && (
              <NavLink
                to="/register"
                activeClassName="active"
                className="btn action-button"
              >
                Register
              </NavLink>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Side);
