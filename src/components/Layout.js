import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loginService from "../services/LoginService";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  const [adminName, setAdminName] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const admin = loginService.getAdmin();
    if (admin) {
      setAdminName(admin.name);
    }

    const customer = loginService.getCustomer();
    if (customer) {
      setUserName(customer.name);
    }
  }, []);

  const isLoggedIn = loginService.isLoggedIn();
  const isCustomer = loginService.isCustomerLoggedIn();
  const isAdmin = loginService.isAdminLoggedIn();

  const logout = () => {
    loginService.logout();
    navigate("/login");
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-sm bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <button
            className=" navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex" id="navbarNav">
            {isLoggedIn && (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/customer" className="nav-link">
                    Customer
                  </Link>
                </li>
                {isAdmin && (
                  <li className="nav-item">
                    <Link to="/merchant" className="nav-link">
                      Merchant
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link to="/card" className="nav-link">
                    Card
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/transaction" className="nav-link">
                    Transaction
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/bill" className="nav-link">
                    Billing and Payment
                  </Link>
                </li>
              </ul>
            )}
            <ul className="navbar-nav ms-auto">
              {isLoggedIn ? (
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={logout}>
                    Logout
                  </button>
                  <span className="badge bg-success">{userName}</span>
                  <span className="badge bg-danger">{adminName}</span>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet></Outlet>
    </>
  );
}
