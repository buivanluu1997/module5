import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {editStudent, studentFindById} from "../../service/StudentService";
import {toast} from "react-toastify";

function EditComponent() {
    const {id} = useParams();
    const studentId = parseInt(id);
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const student1 = studentFindById(studentId);
        setStudent(() => (
            {...student1}
        ))
    }, [])

    const handleSubmit = (value) => {
        editStudent(value);
        toast.success("Đã cập nhật thành công")
        navigate("/students")
    }
    if (!student) {
        return "";
    }

    return (
        <>
            <Formik initialValues={student} onSubmit={handleSubmit} >
                <Form>
                    <h3>Cập nhật học sinh</h3>
                    <div hidden>
                        <label>Id: </label>
                        <Field type='text' name={'id'}/>
                    </div>
                    <div>
                        <label>Tên học sinh: </label>
                        <Field type='text' name={'name'}/>
                    </div>
                    <div>
                        <label>Tuổi: </label>
                        <Field type='text' name={'age'}/>
                    </div>
                    <div>
                        <button type={'submit'}>Cập nhật</button>
                    </div>
                </Form>
            </Formik>
        </>

    );
}

export default EditComponent;