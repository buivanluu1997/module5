import axios from "axios";

export async function searchContract(searchName, serviceTypeId, page, size, totalMoney) {
    let url =`http://localhost:8080/contracts?customers.name_like=${searchName}&serviceTypes.id=${serviceTypeId}&_page=${page}&_limit=${size}&_sort=totalMoney&_order=asc`;
    if (!serviceTypeId) {
        url =`http://localhost:8080/contracts?customers.name_like=${searchName}&_page=${page}&_limit=${size}&_sort=totalMoney&_order=asc`;
    }
    try {
        const response = await axios.get(url);
        console.log(response);
        return {
            data: response.data,
            total: response.headers['x-total-count']
        }
    } catch (e) {
        console.log("Lỗi: " + e.message);
        return [];
    }
}
export async function addContract(contract) {
    try {
        const response = await axios.post('http://localhost:8080/contracts', contract);
        return response.data;
    } catch (e) {
        console.log("Loi: " + e.message);
    }
}
export async function findContractById(id) {
    try {
        const response = await axios.get(`http://localhost:8080/contracts/${id}`);
        return response.data;
    } catch (e) {
        console.log("Loi:" + e.message);
        return null;
    }
}
export async function deleteContractById(id) {
    try {
        const response = await axios.delete(`http://localhost:8080/contracts/${id}`);
        return response.data;
    } catch (e) {
        console.log("Loi:" + e.message);
        return null;
    }
}
export async function editContract(contract) {
    try {
        const response = await axios.put(`http://localhost:8080/contracts/${contract.id}`, contract);
        return response.data;
    } catch (e) {
        console.log("Loi:" + e.message);
        return null;
    }
}



