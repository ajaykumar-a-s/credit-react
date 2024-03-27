export default function ViewRequests() {}
import React, { useState, useEffect } from "react";
 import cardService from "../services/CardService";


function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    cardService.requestlist()
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, []);

  return (
    <div>
      <h1>Requests</h1>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Customer ID</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.customerId}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewRequests;