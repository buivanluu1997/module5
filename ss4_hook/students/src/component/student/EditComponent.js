import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {editStudent, studentFindById} from "../../service/StudentService";
import {toast} from "react-toastify";
import {getAllClasses} from "../../service/ClassesService";

function EditComponent() {
    const {id} = useParams();

    const [student, setStudent] = useState(null);
    const navigate = useNavigate();

    const [classes, setClasses] = useState([]);

    useEffect( () => {
        const fetchData = async () => {
            let studentDetail = await studentFindById(id);
            setStudent(studentDetail);
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            let list = await getAllClasses();
            setClasses(list);
        }
        fetchData()
    }, []);

    const handleSubmit = async (value) => {

        const student = ({
            ...value,
            classes: JSON.parse(value.classes)
        })

        await editStudent(student);
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
                        <label>Lớp:</label>
                        <Field as ='select' name={'classes'}>
                            {
                                classes.map((clas) => (
                                    <option key={clas.id} value={JSON.stringify(clas)}>{clas.name}</option>
                                ))
                            }
                        </Field>
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