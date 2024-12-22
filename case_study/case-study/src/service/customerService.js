import axios from "axios";

export async function findCustomerById(id) {
    try {
        const response = await axios.get(`http://localhost:8080//customers/${id}`);
        return response.data;
    } catch (e){
        console.log("Loi:" + e.message);
        return null;
    }
}
export async function getAllCustomer() {
    try {
        const response = await axios.get("http://localhost:8080/customers");
        return response.data;
    } catch (e){
        console.log("Loi:" + e.message);
        return [];
    }
}