import axios from "axios";

export async function searchCustomers(searchName, categoryId, page, size) {
    let url = `http://localhost:8080/customers?name_like=${searchName}&categories.id=${categoryId}&_page=${page}&_limit=${size}`;
    if (!categoryId) {
        url = `http://localhost:8080/customers?name_like=${searchName}&_page=${page}&_limit=${size}`;
    }
    try {
        const response = await axios.get(url);
        return {
            data: response.data,
            total: response.headers['x-total-count']
        }
    } catch (e) {
        console.log(e.message);
        return [];
    }
}
export async function addCustomer(customer) {
    try {
        const response = await axios.post(`http://localhost:8080/customers`, customer);
        return response.data;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}
export async function findCustomerById(id) {
    try {
        const response = await axios.get(`http://localhost:8080/customers/${id}`);
        return response.data;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}

export async function deleteCustomerById(id) {
    try {
        const response = await axios.delete(`http://localhost:8080/customers/${id}`);
        return response.data;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}