import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
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
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/customer" className="nav-link">
                  Customer
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/merchant" className="nav-link">
                  Merchant
                </Link>
              </li>
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
            {/* <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link">Logout</button>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
      <Outlet></Outlet>
    </>
  );
}
