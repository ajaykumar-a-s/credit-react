import { NavLink, Outlet } from "react-router-dom";
import loginService from "../../services/LoginService";

export default function Card() {
  return (
    <>
      <div className="container-fluid justify-content-between align-items-center">
        <div className="row pt-4">
          <div className="col-sm-3">
            <ul className="nav flex-column nav-pills nav-justified">
              <li className="nav-item">
              <NavLink exact to="/view-cards" className="nav-link" activeClassName="active-link">View Cards</NavLink></li>
              {loginService.isCustomerLoggedIn() && (
                <li className="nav-item">
                  <NavLink to="request" className="nav-link" activeClassName="active-link">Request Card</NavLink>
                </li>
              )}
              {loginService.isAdminLoggedIn() && (
                <li className="nav-item">
                  <NavLink to="view-requests" className="nav-link" activeClassName="active-link">View Requests</NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className="col-sm-9">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}