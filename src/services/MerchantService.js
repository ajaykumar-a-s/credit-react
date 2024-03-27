import {axiosInstance} from "../services/axios-http-client";
class MerchantService{
    getAllMerchants() {
        return axiosInstance.get("http://localhost:8080/merchants");
    }
}
const merchantService = new MerchantService();
export default merchantService;