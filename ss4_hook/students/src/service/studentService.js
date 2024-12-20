import axios from "axios";

/*
export async function getAllStudent(page, size) {
    //gọi API
    try {
        const response = await axios.get(`http://localhost:8080/students?_page=${page}&_limit=${size}`);
        console.log(response);
        return{
            data: response.data,
            total: response.headers['x-total-count']
        }

       /!* let totalCount = response.headers['x-total-count']; // Lấy tổng số bản ghi từ header*!/

    } catch (e) {
        console.log("Lỗi: " + e.message);
        return [];
    }
}
*/

export async function addStudent(student) {
    //gọi API
    try {
        const response = await axios.post("http://localhost:8080/students", student);
        console.log("-----------Service thêm mới---------------");
    } catch (e) {
        console.log("Lỗi: " + e.message);
    }
}

export async function searchStudent(searchName,classId, page, size) {
    let url =`http://localhost:8080/students?name_like=${searchName}&classes.id=${classId}&_page=${page}&_limit=${size}`;
    if (!classId){
        url = `http://localhost:8080/students?name_like=${searchName}&_page=${page}&_limit=${size}`;
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

export async function deleteStudentById(id) {
    //gọi API
    try {
        const response = await axios.delete(`http://localhost:8080/students/${id}`);
        console.log(response);
        return response.data;
    } catch (e) {
        console.log("Lỗi: " + e.message);
        return null;
    }
}

export async function studentFindById(id) {
    try {
        const response = await axios.get(`http://localhost:8080/students/${id}`);
        console.log(response);
        return response.data;
    } catch (e) {
        console.log("Lỗi: " + e.message);
        return null;
    }
}

export async function editStudent(student) {
    try {
        const response = await axios.put(`http://localhost:8080/students/${student.id}`, student);
        console.log(response);
        return response.data;
    } catch (e) {
        console.log("Lỗi: " + e.message);
    }
}