import axios from "axios";

const listStudent = [{id: 1, name: "Nguyen Van Trung", age: "18"},
    {id: 2, name: "Hoang Ngoc Huy", age: "17"},
    {id: 3, name: "Tran Trong Hoang", age: "18"}];

export async function getAllStudent() {
    //gọi API
    try {
        const response = await axios.get("http://localhost:8080/students");
        console.log(response);
        return response.data;
    } catch (e) {
        console.log("Lỗi: " + e.message);
        return [];
    }
}

export async function addStudent(student) {
    //gọi API
    try {
        const response = await axios.post("http://localhost:8080/students", student);
        console.log("-----------Service thêm mới---------------");
    } catch (e) {
        console.log("Lỗi: " + e.message);
    }
}

export async function searchStudent(name) {
    try {
        const response = await axios.get("http://localhost:8080/students", {params: {name: name}});
        console.log(response);
        return response.data;
    } catch (e) {
        console.log("Lỗi: " + e.message);
        return [];
    }
}

export async function deleteStudentById(id) {
    //gọi API
    try {
        const response = await axios.delete("http://localhost:8080/students/"+id);
        console.log(response);
        return response.data;
    } catch (e) {
        console.log("Lỗi: " + e.message);
        return null;
    }
}

export async function studentFindById(id) {
    try {
        const response = await axios.get("http://localhost:8080/students/" + id);
        console.log(response);
        return response.data;
    } catch (e) {
        console.log("Lỗi: " + e.message);
        return null;
    }
}

export async function editStudent(student) {
    try {
        const response = await axios.put("http://localhost:8080/students/"+student.id, student);
        console.log(response);
        return response.data;
    } catch (e) {
        console.log("Lỗi: " + e.message);
    }
}