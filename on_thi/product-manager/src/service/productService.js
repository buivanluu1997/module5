import axios from "axios";

export async function searchProducts(searchName, categoryId, page, size) {
    let url = `http://localhost:8080/products?name_like=${searchName}&categories.id=${categoryId}&_page=${page}&_limit=${size}`;
    if (!categoryId) {
        url = `http://localhost:8080/products?name_like=${searchName}&_page=${page}&_limit=${size}`;
    }
    try {
        const response = await axios.get(url);
        console.log("---------------------------------------------")
        console.log(response.headers['x-total-count']);
        return {
            data: response.data,
            total: response.headers['x-total-count']
        };
    } catch (e) {
        console.log(e.message);
        return null;
    }
}
export async function addProduct(product) {
    try {
        const response = await axios.post("http://localhost:8080/products", product);
        return response.data;
    } catch (e) {
        console.log(e.message);
    }
}

export async function findProductById(id) {
    try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        return response.data;
    } catch (e) {
        console.log(e.message);
        return null;
    }
}
export async function deleteProductById(id) {
    try {
        const response = await axios.delete(`http://localhost:8080/products/${id}`);
        return response.data;
    } catch (e) {
        console.log(e.message);
    }
}

export async function updateProduct(product) {
    try {
        const response = await axios.put(`http://localhost:8080/products/${product.id}`, product);
        return response.data;
    } catch (e) {
        console.log(e.message);
    }
}
