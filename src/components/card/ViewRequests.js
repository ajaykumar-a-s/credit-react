import React, { useState, useEffect } from "react";
import cardService from "../../services/CardService";

function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    cardService.requestlist()
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, []);

  const handleValidate = (creditCardRequestId) => {
    cardService.validate(creditCardRequestId) // replace with your validate method
      .then(response => {
        console.log(response);
        setRequests(requests.filter(request => request.creditCardRequestId !== creditCardRequestId));
        setMessage(`Request ${creditCardRequestId} is validated.`);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="row mt-5">
      <div className="text-center">
      <h1>REQUEST LISTS</h1></div>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <table className="table table-bordered table-success table-striped table-hover">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Status</th>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Date of Birth</th>
              <th>Annual Income</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.creditCardRequestId}>
                <td>{request.creditCardRequestId}</td>
                <td>{request.status}</td>
                <td>{request.customer.customerId}</td>
                <td>{request.customer.name}</td>
                <td>{request.customer.email}</td>
                <td>{request.customer.phone}</td>
                <td>{request.customer.address}</td>
                <td>{request.customer.dateOfBirth}</td>
                <td>{request.customer.annualIncome}</td>
                <td><button onClick={() => handleValidate(request.creditCardRequestId)}>Validate</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewRequests;