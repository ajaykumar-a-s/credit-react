import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import loginService from "../../services/LoginService";
import transactionService from "../../services/TransactionService";
function ViewTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Set this according to your logic
  const [isCustomer, setIsCustomer] = useState(false); // Set this according to your logic

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    watch,
  } = useForm({ mode: "onChange" });

  const transactionId = watch("transactionId");
  const customerCCN = watch("customerCreditCardNumber");
  const startDate = watch("startDate");

  useEffect(() => {
    if (transactionId) {
      setValue("customerCreditCardNumber", "");
      setValue("startDate", "");
      setValue("endDate", "");
    }
  }, [setValue, transactionId]);

  useEffect(() => {
    if (customerCCN) {
      setValue("transactionId", "");
      if (customerCCN.length === 16) {
        setValue("startDate", "");
        setValue("endDate", "");
      }
    }
  }, [customerCCN, setValue]);
  useEffect(() => {
    if (!customerCCN || customerCCN.length !== 16) {
      setValue("startDate", "");
      setValue("endDate", "");
    }
  }, [customerCCN, setValue]);
  useEffect(() => {
    setIsAdmin(loginService.isAdminLoggedIn());
  }, []);
  useEffect(() => {
    setIsCustomer(loginService.isCustomerLoggedIn());
  }, []);
  useEffect(() => {
    const checkUserStatus = async () => {
      const customerStatus = await loginService.isCustomerLoggedIn();
      setIsCustomer(customerStatus);
      if (customerStatus && loginService.getCustomer().creditCard) {
        setValue(
          "customerCreditCardNumber",
          loginService.getCustomer().creditCard.cardNumber
        );
      } else if (customerStatus) {
        setErrorMessage("You dont have a card");
      }
      handleSubmit(onSubmit)();
    };
    checkUserStatus();
  }, [handleSubmit, setValue]);
  const onSubmit = (data) => {
    if (data.transactionId) {
      transactionService
        .getTransactionById(data.transactionId)
        .then((response) => {
          console.log(response.data);
          setTransactions([response.data]);
        })
        .catch((error) => {
          setErrorMessage(error?.response?.data);
        });
    } else if (data.customerCreditCardNumber) {
      if (data.startDate && data.endDate) {
        transactionService
          .getTransactionsByCustomerCreditCardNumberForParticularDuration(
            data.customerCreditCardNumber,
            data.startDate,
            data.endDate
          )
          .then((response) => {
            setTransactions(response.data);
          })
          .catch((error) => {
            setErrorMessage(error?.response?.data);
          });
      } else {
        transactionService
          .getTransactionsByCustomerCreditCardNumber(
            data.customerCreditCardNumber
          )
          .then((response) => {
            setTransactions(response.data);
          })
          .catch((error) => {
            setErrorMessage(error?.response?.data);
          });
      }
    } else {
      transactionService
        .getAllTransactions()
        .then((response) => {
          setTransactions(response.data);
        })
        .catch((error) => {
          setErrorMessage(error?.response?.data);
        });
    }
    // Add your API calls here
  };

  return (
    <>
      <div className="row">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {isAdmin && (
              <div className="col-lg">
                <div className="form-group">
                  <label htmlFor="transactionId" className="form-label">
                    ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="transactionId"
                    {...register("transactionId")}
                    disabled={!!customerCCN}
                  />
                </div>
              </div>
            )}
            {isAdmin && (
              <div className="col-lg">
                <div className="form-group">
                  <label
                    htmlFor="customerCreditCardNumber"
                    className="form-label"
                  >
                    Credit Card Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerCreditCardNumber"
                    {...register("customerCreditCardNumber", {
                      pattern: /^[0-9]{16}$/,
                    })}
                    disabled={!!transactionId}
                  />
                </div>
              </div>
            )}
            <div className="col-lg">
              <div className="form-group">
                <label htmlFor="startDate" className="form-label">
                  Start Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  {...register("startDate")}
                  disabled={!customerCCN || !/^[\d]{16}$/.test(customerCCN)}
                />
              </div>
            </div>
            <div className="col-lg">
              <div className="form-group">
                <label htmlFor="endDate" className="form-label">
                  End Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  {...register("endDate", { required: !!startDate })}
                  min={getValues("startDate")}
                  disabled={!customerCCN || !/^[\d]{16}$/.test(customerCCN)}
                />
              </div>
            </div>
            <div className="col-lg d-flex align-items-center">
              <button
                type="submit"
                className="btn btn-success"
                disabled={!isValid}
              >
                Search
              </button>
            </div>
            <div className="col-lg-2 d-flex align-items-end alert alert-info">
              Leave the fields blank to get all transactions.
            </div>
          </div>
        </form>
      </div>
      {errorMessage && transactions.length === 0 && (
        <div className="alert alert-danger">
          <p>No Transactions!</p>
          <br />
          {errorMessage}
        </div>
      )}
      {transactions.length > 0 && (
        <div className="row mt-2">
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
                {transactions.map((transaction) => (
                  <tr key={transaction.transactionId}>
                    <th scope="row">{transaction.transactionId}</th>
                    <td>{transaction.transactionName}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.amount}</td>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                    <td>{transaction.transactionType}</td>
                    <td>{transaction.customerCreditCardNumber}</td>
                    <td>{transaction.merchantCardNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewTransactions;
