import React, {useRef, useState} from "react";
import {addStudent} from "../../service/StudentService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {toast} from "react-toastify";


function AddComponent(){

    const [student, setStudent] = useState({});

    const navigate = useNavigate();

    const handleSubmit = (value) =>{
        addStudent(value);
        toast.success("Đã thêm học sinh thành công!");
        navigate("/");
    }

    const handleValidate = Yup.object({
        id: Yup.number()
            .required("Id không được để trống")
            .min(1, "Id phải lớn hơn hoặc bằng 1")
            .integer("Id phải là số nguyên"),
        name: Yup.string()
            .required("Tên không được để trống")
            .matches(/^[\p{L}\s]+$/u, "Tên không được chứa số và kí tự đặc biệt"),
        age: Yup.number()
            .required("Tuổi không được để trống")
            .min(1, "Tuổi phải lớn hơn hoặc bằng 1")
            .integer("Tuổi phải là số nguyên")
    });


    return(
        <>
            <Formik initialValues={student} onSubmit={handleSubmit} validationSchema={handleValidate}>
                <Form>
                    <h2>Thêm sản phẩm</h2>
                    <div>
                        <label>Id:</label>
                        <Field type='number' name="id"/>
                        <ErrorMessage style={{color:'red'}} name={'id'} component='div'/>
                    </div>
                    <div>
                        <label>Tên học sinh:</label>
                        <Field type = 'text' name="name"/>
                        <ErrorMessage style={{color:'red'}} name={"name"} component='div'/>
                    </div>
                    <div>
                        <label>Tuổi:</label>
                        <Field type='number' name="age"/>
                        <ErrorMessage style={{color:'red'}} name={"age"} component='div'/>
                    </div>
                    <div>
                        <button type={"submit"}>Thêm</button>
                    </div>
                </Form>
            </Formik>
        </>
    );
}

export default AddComponent;