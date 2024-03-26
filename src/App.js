import "./App.css";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewCustomer from "./components/customer/ViewCustomer";
import Merchant from "./components/merchant/Merchant";
import Card from "./components/card/Card";
import Transaction from "./components/transaction/Transaction";
import Bill from "./components/bill/Bill";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/customer" element={<ViewCustomer />}></Route>
            <Route path="/merchant" element={<Merchant />}></Route>
            <Route path="/card" element={<Card />}></Route>
            <Route path="/transaction" element={<Transaction />}></Route>
            <Route path="/bill" element={<Bill />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
