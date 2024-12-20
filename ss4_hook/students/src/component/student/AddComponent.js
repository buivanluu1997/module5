import React, {useEffect, useRef, useState} from "react";
import {addStudent} from "../../service/studentService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {getAllClasses} from "../../service/classesService";


function AddComponent(){

    const [student, setStudent] = useState({name:"", age:"", classes:""});
    const [listClass, setListClass] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (value) => {

        console.log("---------value----------")
        console.log(value)
        const student = {
            ...value,
            classes: JSON.parse(value.classes)
        }

        await addStudent(student);
        console.log("++++++++++++++++++++++add+++++++++++++++++")
        console.log(student)
        console.log("Thêm mới thành công");
        toast.success("Đã thêm học sinh thành công!");
        navigate("/students");
    }

    useEffect(() => {
        const fetchData = async () => {
            let list = await getAllClasses();
            setListClass(() => [...list])
        }
        fetchData();
    },[])

    const handleValidate = Yup.object({
       /* id: Yup.number()
            .required("Id không được để trống")
            .min(1, "Id phải lớn hơn hoặc bằng 1")
            .integer("Id phải là số nguyên"),*/
        name: Yup.string()
            .required("Tên không được để trống")
            .matches(/^[\p{L}\s]+$/u, "Tên không được chứa số và kí tự đặc biệt"),
        age: Yup.number()
            .required("Tuổi không được để trống")
            .min(1, "Tuổi phải lớn hơn hoặc bằng 1")
            .integer("Tuổi phải là số nguyên")
    });
    /*useEffect(() => {
        return()=>{
            console.log("-------------add----------------------")
        }
    }, []);
*/
    return(
        <>
            <Formik initialValues={student} onSubmit={handleSubmit} validationSchema={handleValidate}>
                <Form>
                    <h2>Thêm sản phẩm</h2>
                    {/*<div>
                        <label>Id:</label>
                        <Field type='number' name="id"/>
                        <ErrorMessage style={{color:'red'}} name={'id'} component='div'/>
                    </div>*/}
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
                        <label>Lớp:</label>
                        <Field as ='select' name={'classes'}>
                            <option value="">--------chọn--------</option>
                            {
                                listClass.map((clas)=>(
                                    <option key={clas.id} value={JSON.stringify(clas)}>{clas.name}</option>
                                ))
                            }
                        </Field>
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