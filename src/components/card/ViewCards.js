import React, { useState, useEffect } from 'react';
import cardService from "../../services/CardService";
import loginService from "../../services/LoginService";
import './ViewCards.css'; 

export default function ViewCards() {
  const [cardList, setCardList] = useState([]);
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    if (loginService.isAdminLoggedIn()) {
      cardService.cardList()
        .then(response => {
          if (response.data != null) {
            setCardList(response.data);
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      if (loginService.getCustomer().creditCard != null) {
        setCardList([loginService.getCustomer().creditCard]);
      }
      setCustomerName(loginService.getCustomer().name);
    }
  }, []);

  return (
    <div>
      
      {cardList.length > 0 ? (
       <div className="cards-container">
          {cardList.map((card, index) => (
            
            <div className="credit-card" key={index}>
              <div className="credit-card-logo">FORD Credit</div>
              <div className="credit-card-type">{card.creditCardType.cardType}</div>
              <div className="credit-card-name">{loginService.isAdminLoggedIn() ? card.customer.name : customerName}</div>
              <div className="credit-card-number">{card.cardNumber}</div>
              <div className="credit-card-info">
                <div className="credit-card-valid">
                  <div className="credit-card-label">Valid Upto</div>
                  {card.validUpto}
                </div>
                <div className="credit-card-cvv">
                  <div className="credit-card-label">CVV</div>
                  <div>{loginService.isAdminLoggedIn() ? "$#%" : card.cvv}</div>
                </div>
              </div>
              <div className="credit-card-limits">
                <div className="limit">
                  <div className="credit-card-label credit-limit">Credit Limit</div>
                  <div>{card.creditCardType?.creditLimit}</div>
                </div>
                <div className="limit">
                  <div className="credit-card-label current-limit">Current Limit</div>
                  <div>{card.currentLimit}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="noCards">NO CARDS FOUND</div>
      )}
    </div>
  );
}