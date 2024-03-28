import "./App.css";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ViewCustomer from "./components/customer/ViewCustomer";
import Merchant from "./components/merchant/Merchant";
import Card from "./components/card/Card";
import Transaction from "./components/transaction/Transaction";
import Bill from "./components/bill/Bill";
import TransferAmount from "./components/transaction/TransferAmount";
import ViewTransactions from "./components/transaction/ViewTransactions";
import RequestCard from "./components/card/RequestCard";
import ViewRequests from "./components/card/ViewRequests";
import ViewCard from "./components/card/ViewCards";
import ViewMerchant from "./components/merchant/ViewMerchant";
import AddMerchant from "./components/merchant/AddMerchant";
import AddCustomer from "./components/AddCustomer";
import UpdateMerchant from "./components/merchant/UpdateMerchant";
import UpdateCustomer from "./components/customer/UpdateCustomer";
import loginService from "./services/LoginService";
import Login from "./components/Login";

function App() {
  const isLoggedIn = loginService.isLoggedIn();
  const isCustomer = loginService.isCustomerLoggedIn();
  const isAdmin = loginService.isAdminLoggedIn();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<AddCustomer />} />
        {!isLoggedIn ? (
          <Route path="*" element={<Navigate to="/login" />} />
        ) : (
          <Route path="/" element={<Layout />}>
            <Route path="/customer" element={<ViewCustomer />} />
            <Route path="/update-customer" element={<UpdateCustomer />} />
            <Route path="/merchant/*" element={<Merchant />}>
              <Route path="view" element={<ViewMerchant />} />
              <Route path="add" element={<AddMerchant />} />
              <Route path="update" element={<UpdateMerchant />} />
              <Route path="*" element={<Navigate to="view" />} />
            </Route>
            <Route path="/card/*" element={<Card />}>
              <Route path="request" element={<RequestCard />} />
              <Route path="view-requests" element={<ViewRequests />} />
              <Route path="view-card" element={<ViewCard />} />
              <Route path="*" element={<Navigate to="view-card" />} />
            </Route>
            <Route path="/transaction/*" element={<Transaction />}>
              <Route path="transfer-amount" element={<TransferAmount />} />
              <Route path="view-all" element={<ViewTransactions />} />
              <Route path="*" element={<Navigate to="view-all" />} />
            </Route>
            <Route path="/bill" element={<Bill />} />
            <Route
              path="*"
              element={
                isCustomer ? (
                  <Navigate to="/customer" />
                ) : (
                  <Navigate to="/card" />
                )
              }
            />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
