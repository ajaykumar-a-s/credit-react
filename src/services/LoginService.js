import {axiosInstance} from '../services/axios-http-client';

class LoginService {
  customerLogin(loginDetails) {
    return axiosInstance.post('http://localhost:8080/customer-login', loginDetails);
  }

  adminLogin(loginDetails) {
    return axiosInstance.post('http://localhost:8080/admin-login', loginDetails);
  }

  isCustomerLoggedIn() {
    return localStorage.getItem('customer') ? true : false;
  }

  isAdminLoggedIn() {
    return localStorage.getItem('admin') ? true : false;
  }

  isLoggedIn() {
    return this.isCustomerLoggedIn() || this.isAdminLoggedIn();
  }

  getCustomer() {
    if (this.isCustomerLoggedIn()) {
      return JSON.parse(localStorage.getItem('customer') || '{}');
    }
  }

  getAdmin() {
    if (this.isAdminLoggedIn()) {
      return JSON.parse(localStorage.getItem('admin') || '{}');
    }
  }

  logout() {
    localStorage.removeItem('customer');
    localStorage.removeItem('admin');
  }
}
const loginService = new LoginService();
export default loginService;