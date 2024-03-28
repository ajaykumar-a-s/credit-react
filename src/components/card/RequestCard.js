import React,{useState} from 'react';
import loginService from "../../services/LoginService";
import cardService from "../../services/CardService";



export default function RequestCard() {
    const [apiResponse, setApiResponse] = useState(null);
  
    const onButtonClick = () => {
      const customerId = loginService.getCustomer().customerId;
      console.log(customerId);
      cardService.requestCard(customerId)
        .then(response => {
           
          console.log(response);
          setApiResponse("SUCCESFULLY REQUESTED");
        })
        .catch(error => {
          console.error(error);
          setApiResponse("ALREADY REQUESTED");
        });
    };
  
    return (
        <div >
   
        <button onClick={onButtonClick}>Request Card</button>
      
        {apiResponse && <div>{apiResponse}</div>}
      </div>
    );
  }