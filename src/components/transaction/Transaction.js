import { Link, Outlet } from "react-router-dom";
export default function Transaction() {
  return (
    <>
      <div className="container-fluid justify-content-between align-items-center">
        <div className="row pt-4">
          <div className="col-sm-3">
            <ul className="nav flex-column nav-pills nav-justified">
              <li className="nav-item">
                <Link to={"transfer-amount"} className="nav-link">Transfer Amount</Link>
              </li>
              <li className="nav-item">
                <Link to={"view-all"} className="nav-link">View Transactions</Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-9" />
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
