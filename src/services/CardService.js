class CardService{
    
  
  
    requestlist() {
      return axiosInstance.get('http://localhost:8080/requestlist');
    }
}
const cardService = new CardService();
export default cardService;
  