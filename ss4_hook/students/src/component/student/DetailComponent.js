import React from "react";
import {useParams} from "react-router-dom";
import {studentFindById} from "../../service/StudentService";

function DetailComponent(){
    const {id} = useParams();
    const studentId = parseInt(id)
    const student = studentFindById(studentId);

    return(
        <>
            <h2>Chi tiết sản phẩm</h2>
            <label>Id:</label>
            <label>{student.id}</label><br/>
            <label>Tên học sinh:</label>
            <label>{student.name}</label><br/>
            <label>Tuổi:</label>
            <label>{student.age}</label><br/>
        </>
    );
}
export default DetailComponent;