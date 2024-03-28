import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import merchantService from "../../services/MerchantService";
import transactionService from "../../services/TransactionService";
export default function TransferAmount() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });
  const merchantName = useWatch({ control, name: "merchantName" });
  const merchantCardNumber = useWatch({ control, name: "merchantCardNumber" });
  const [merchants, setMerchants] = useState([]);
  const [transactionResult, setTransactionResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    merchantService
      .getAllMerchants()
      .then((response) => {
        setMerchants(response.data);
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
      });
  }, []);

  useEffect(() => {
    if (merchantName) {
      const selectedMerchant = merchants.find(
        (merchant) => merchant.name === merchantName
      );
      setValue("merchantCardNumber", selectedMerchant.cardNumber);
    }
  }, [merchantName, merchants, setValue]);

  useEffect(() => {
    if (merchantCardNumber) {
      const selectedMerchant = merchants.find(
        (merchant) => merchant.cardNumber === merchantCardNumber
      );
      setValue("merchantName", selectedMerchant.name);
    }
  }, [merchantCardNumber, merchants, setValue]);
  // ... rest of your component
  const onSubmit = (data) => {
    transactionService
      .transferAmount(data)
      .then((response) => {
        setTransactionResult(response.data);
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data);
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label
                    htmlFor="customerCreditCardNumber"
                    className="form-label"
                  >
                    Your Credit Card Number
                  </label>
                  <input
                    type="text"
                    {...register("customerCreditCardNumber", {
                      required: "Credit Card Number is required",
                      pattern: {
                        value: /^[0-9]{16}$/,
                        message: "Credit Card Number must be 16 digits",
                      },
                    })}
                    className={`form-control ${
                      errors.customerCreditCardNumber ? "is-invalid" : ""
                    }`}
                    id="customerCreditCardNumber"
                  />
                  {errors.customerCreditCardNumber && (
                    <p className="invalid-feedback">
                      {errors.customerCreditCardNumber.message}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="customerName" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    {...register("customerName", {
                      required: "Your Name is required",
                    })}
                    className={`form-control ${
                      errors.customerName ? "is-invalid" : ""
                    }`}
                    id="customerName"
                  />
                  {errors.customerName && (
                    <p className="invalid-feedback">
                      {errors.customerName.message}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="text"
                    {...register("cvv", {
                      required: "CVV is required",
                      pattern: {
                        value: /^[0-9]{3}$/,
                        message: "CVV must be 3 digits",
                      },
                    })}
                    className={`form-control ${errors.cvv ? "is-invalid" : ""}`}
                    id="cvv"
                  />
                  {errors.cvv && (
                    <p className="invalid-feedback">{errors.cvv.message}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="transactionName" className="form-label">
                    Transaction Name
                  </label>
                  <input
                    type="text"
                    {...register("transactionName")}
                    className="form-control"
                    id="transactionName"
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="merchantName" className="form-label">
                    Merchant Name
                  </label>
                  <select
                    id="merchantName"
                    {...register("merchantName", {
                      required: "Merchant Name is required",
                    })}
                    className={`form-select ${
                      errors.merchantName ? "is-invalid" : ""
                    }`}
                  >
                    {merchants.map((merchant) => (
                      <option key={merchant.name} value={merchant.name}>
                        {merchant.name}
                      </option>
                    ))}
                  </select>
                  {errors.merchantName && (
                    <p className="invalid-feedback">
                      {errors.merchantName.message}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="merchantCardNumber" className="form-label">
                    Merchant Card Number
                  </label>
                  <select
                    id="merchantCardNumber"
                    {...register("merchantCardNumber", {
                      required: "Merchant Card Number is required",
                    })}
                    className={`form-select ${
                      errors.merchantCardNumber ? "is-invalid" : ""
                    }`}
                  >
                    {merchants.map((merchant) => (
                      <option
                        key={merchant.cardNumber}
                        value={merchant.cardNumber}
                      >
                        {merchant.cardNumber}
                      </option>
                    ))}
                  </select>
                  {errors.merchantCardNumber && (
                    <p className="invalid-feedback">
                      {errors.merchantCardNumber.message}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="validUpto" className="form-label">
                    Valid Upto
                  </label>
                  <input
                    type="text"
                    {...register("validUpto", {
                      required: "Valid Upto is required",
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                        message: "Valid Upto must be in MM/YY format",
                      },
                    })}
                    id="validUpto"
                    className={`form-control ${
                      errors.validUpto ? "is-invalid" : ""
                    }`}
                    placeholder="MM/YY"
                  />
                  {errors.validUpto && (
                    <p className="invalid-feedback">
                      {errors.validUpto.message}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    {...register("description")}
                    id="description"
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                  />
                  {errors.description && (
                    <p className="invalid-feedback">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  min="1"
                  {...register("amount", {
                    required: "This field is required",
                    min: {
                      value: 1,
                      message: "The minimum value is 1",
                    },
                  })}
                  id="amount"
                  className={`form-control ${
                    errors.amount ? "is-invalid" : ""
                  }`}
                />
                {errors.amount && (
                  <p className="invalid-feedback">{errors.amount.message}</p>
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-success w-100 mt-5" disabled={!isValid}>
              Pay
            </button>
          </form>
        </div>
        <div className="col-sm">
          {transactionResult && (
            <div>
              <div className="alert alert-success">Transaction Successful</div>
              <div className="table-responsive">
                <table className="table table-bordered table-success table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Date</th>
                      <th scope="col">Type</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Merchant</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">{transactionResult.transactionId}</th>
                      <td>{transactionResult.transactionName}</td>
                      <td>{transactionResult.description}</td>
                      <td>{transactionResult.amount}</td>
                      <td>
                        {new Date(transactionResult.date).toLocaleDateString()}
                      </td>
                      <td>{transactionResult.transactionType}</td>
                      <td>{transactionResult.customerCreditCardNumber}</td>
                      <td>{transactionResult.merchantCardNumber}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {errorMessage && !transactionResult && (
            <div className="alert alert-danger">
              <p>Transaction Failed!</p>
              <br />
              <pre>{errorMessage}</pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
