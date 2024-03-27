import { axiosInstance } from "../services/axios-http-client";
class TransactionService {
  transferAmount(transactionRequest) {
    return axiosInstance.post(
      "http://localhost:8080/transfer-amount",
      transactionRequest
    );
  }
  getTransactionById(transactionId) {
    return axiosInstance.get(
      `http://localhost:8080/transaction/${transactionId}`
    );
  }
  getAllTransactions() {
    return axiosInstance.get("http://localhost:8080/transactions");
  }
  getTransactionsByCustomerCreditCardNumber(customerCreditCardNumber) {
    return axiosInstance.get(
      `http://localhost:8080/transactions/${customerCreditCardNumber}`
    );
  }
  getTransactionsByCustomerCreditCardNumberForParticularDuration(
    customerCreditCardNumber,
    startDate,
    endDate
  ) {
    return axiosInstance.get(
      `http://localhost:8080/transactions/${customerCreditCardNumber}/${startDate}/${endDate}`
    );
  }
}
const transactionService = new TransactionService();
export default transactionService;