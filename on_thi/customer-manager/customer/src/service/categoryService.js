import axios from "axios";

export async function getAllCategory() {
    try {
        const response = await axios.get("http://localhost:8080/categories");
        return response.data;
    } catch (error) {
        console.log("Loi: " + error.message);
        return [];
    }
}
export async function findCategoryById(id) {
    try {
        const response = await axios.get(`http://localhost:8080/category/${id}`);
        return response.data
    } catch (e) {
        console.log(e.message);
        return null;
    }
}