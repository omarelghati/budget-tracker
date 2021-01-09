import React, { useState } from "react";
import "../../assets/css/sidebar.css";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { useFormStyles } from "../../utils/index";
import { useLoader, Loader } from "../../utils";
import { Button } from "@material-ui/core";
import { LogoutAction } from "./../../redux/slices/user";

const Side = () => {
  const classes = useFormStyles();
  const dispatch = useDispatch();
  const { loading } = useLoader();

  const [showLogout, setShowLogout] = useState(false);
  const confirmButtonProps = {
    disabled: loading,
    variant: "contained",
    color: "primary",
    className: classes.button,
  };
  const cancelButtonProps = {
    disabled: loading,
    variant: "contained",
    color: "secondary",
    className: classes.button,
  };
  const handleLogout = () => {
    dispatch(LogoutAction());
    setShowLogout(false);
  };
  const token = localStorage.token;
  const loggedIn = useSelector((state) => state.user.loggedIn) || token;
  return (
    <nav className="navbar navbar-light navbar-expand-md navigation-clean-button">
      <div className="container">
        <NavLink
          activeClassName="somethinelse"
          className="navbar-brand"
          to={loggedIn ? "/dashboard" : "/login"}
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
              {loggedIn && (
                <NavLink
                  activeClassName="active"
                  className="btn action-button"
                  to="/categories"
                >
                  Categories & Debts
                </NavLink>
              )}
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
            {loggedIn ? (
              <span>
                <a
                  onClick={() => setShowLogout(true)}
                  className="btn action-button"
                >
                  Logout
                </a>
              </span>
            ) : (
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
      <Modal onHide={() => setShowLogout(false)} show={showLogout}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="modal-title">Add category</h4>
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body>
            <div className="form-group">Are you sure ?</div>
          </Modal.Body>
          <Modal.Footer>
            <Button {...confirmButtonProps} onClick={handleLogout}>
              Yes
              {loading && <Loader />}
            </Button>
            <Button {...cancelButtonProps} onClick={() => setShowLogout(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </nav>
  );
};

export default withRouter(Side);
