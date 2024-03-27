import {axiosInstance} from "./axios-http-client";
class BillService{
    getBill(cardNumber){
        return axiosInstance.get('http://localhost:8080/getBill/'+cardNumber);
    }
    payBill(cardNumber){
        return axiosInstance.get('http://localhost:8080/billPayment/'+cardNumber);
    }
}
export default new BillService();