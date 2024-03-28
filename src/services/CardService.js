import { axiosInstance } from "../services/axios-http-client";

class CardService {
 

  cardList() {
    return axiosInstance.get('/cardlist')
      .catch(error => {
        console.error(error);
      });
  }

  requestlist() {
    return axiosInstance.get('http://localhost:8080/requestlist');
  }
  
  requestCard(customerId) {
    return axiosInstance.get(`http://localhost:8080/request/${customerId}`);
  }
  validate(creditCardRequestId) {
    return axiosInstance.get(`http://localhost:8080/validate/${creditCardRequestId}`);
  }
}

const cardService = new CardService();
export default cardService;