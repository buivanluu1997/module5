import React, {useRef, useState} from "react";
import {addStudent} from "../../service/StudentService";

function AddComponent({handleIsLoading}){

    const [student, setStudent] = useState({})

    const idRef = useRef();
    const nameRef = useRef();
    const ageRef = useRef();

    const handleAddStudent = () => {
        addStudent({
            id: idRef.current.value,
            name: nameRef.current.value,
            age: ageRef.current.value
        })
        handleIsLoading();
    }

    return(
        <>
            <h3>Thêm học sinh</h3>
            <form>
                <label>ID: </label>
                <input ref={idRef} placeholder={"Nhập ID"}/>
                <label>Tên: </label>
                <input ref={nameRef} placeholder={"Nhập tên"}/>
                <label>Tuổi: </label>
                <input ref={ageRef} placeholder={"Nhập tuổi"}/>
                <button type={"button"} onClick={handleAddStudent}>Thêm</button>
            </form>
        </>
    );
}

export default AddComponent;