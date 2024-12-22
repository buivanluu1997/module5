import axios from "axios";

export async function findServiceTypeById(id) {
    try {
        const response = await axios.get(`http://localhost:8080//serviceTypes/${id}`)
    } catch (e){
        console.log(e);
        return null;
    }
}

export async function getAllServiceType() {
    try {
        const response = await axios.get("http://localhost:8080/serviceTypes");
        return response.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}