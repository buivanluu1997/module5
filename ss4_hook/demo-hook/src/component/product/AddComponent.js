import React, {useState} from "react";
import {addProduct} from "../../service/ProductService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


function AddComponent() {

    const [product, setProduct] = useState({id: "", name: "", brand: ""});

    const navigate = useNavigate();

    const handleSubmit = (value) => {
        addProduct(value)
        toast.success("Đã thêm sản phẩm thành công")
        navigate("/list")
    }

    const handleValidate = Yup.object({
        id: Yup.number().required("ID không được để trống").min(1, "Id phải lớn hơn hoặc bằng 1"),
        name: Yup.string().required("Tên không được để trống")
            .matches(/^[a-zA-Z0-9\s]+$/, "Tên sản phẩm không được chứa kí tự đặc biệt"),
        brand: Yup.string()
            .required("Hãng sản xuất không được để trống")
            .matches(/^[a-zA-Z\s]+$/, "Tên hãng không được chứa ký tự đặc biệt và số")
    })

    return (
        <>
            <Formik initialValues={product} onSubmit={handleSubmit} validationSchema={handleValidate}>
                <Form>
                    <div>
                        <label>ID:</label>
                        <Field type='number' name="id"/>
                        <ErrorMessage style={{color: 'red'}} name={"id"} component={'div'}/>
                    </div>
                    <div>
                        <label>Tên sản phẩm:</label>
                        <Field type="text" name="name"></Field>
                        <ErrorMessage style={{color: 'red'}} name={"name"} component={'div'}/>
                    </div>
                    <div>
                        <label>Hãng sản xuất:</label>
                        <Field type="text" name="brand"></Field>
                        <ErrorMessage style={{color: 'red'}} name={"brand"} component={'div'}/>
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