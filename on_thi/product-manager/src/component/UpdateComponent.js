import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {findProductById, updateProduct} from "../service/productService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {getAllCategory} from "../service/categoriesService";

function UpdateComponent() {
    const [product, setProduct] = useState(null);
    const {id} = useParams();
    const [categoryList, setCategoryList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let product = await findProductById(id);
            console.log("====================")
            console.log(product);
            setProduct({
                ...product,
                categories: JSON.stringify(product.categories),
            })
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            let list = await getAllCategory();
            setCategoryList(list);
        }
        fetchData();
    },[])

    const validationSchema = Yup.object({
        name: Yup.string().required("Tên không được để trống"),
        manufacturer: Yup.string().required("Hãng không được để trống").matches(/^[a-zA-Z0-9\\s]+$/, "Tên hãng không đươc chứa kí tự đặc biệt"),
        startDate: Yup.date().required("Ngày không được để trống"),
        price: Yup.number().required("Giá không được để trống").min(10000, "Giá phải lớn hơn 10000 Vnđ"),
        categories: Yup.string().required("Phải chọn loại sản phẩm").notOneOf([""], "Phải chọn loại sản phẩm")
    })

    if (!product) {
        return "";
    }

    const handleUpdateProduct = async (value) => {
        const product = {
            ...value,
            categories: JSON.parse(value.categories)
        }
        await updateProduct(product);
        toast.success("Đã cập nhật sản phẩm thành công");
        navigate("/products")

    }


    return(
        <>
            <Formik initialValues={product} onSubmit={handleUpdateProduct} validationSchema={validationSchema}>
                <Form>
                    <div>
                        <label>Tên sẩn phẩm:</label>
                        <Field type='text' name="name"/>
                        <ErrorMessage style={{color: "red"}} name="name" component="div"/>
                    </div>
                    <br/>
                    <div>
                        <label>Loại sản phẩm:</label>
                        <Field as='select' name={'categories'}>
                            {
                                categoryList.map((category) => (
                                    <option key={category.id} value={JSON.stringify(category)}>{category.name}</option>
                                ))
                            }
                        </Field>
                        <ErrorMessage style={{color: "red"}} name="categories" component="div"/>
                    </div>
                    <br/>
                    <div>
                        <label>Hãng sản xuất:</label>
                        <Field type='text' name="manufacturer"/>
                        <ErrorMessage style={{color: "red"}} name="manufacturer" component="div"/>
                    </div>
                    <br/>
                    <div>
                        <label>Ngày nhập:</label>
                        <Field type='date' name="startDate"/>
                        <ErrorMessage style={{color: "red"}} name="starDate" component="div"/>
                    </div>
                    <br/>
                    <div>
                        <label>Giá:</label>
                        <Field type='number' name="price"/>
                        <ErrorMessage style={{color: "red"}} name="price" component="div"/>
                    </div>
                    <br/>
                    <div>
                        <button type='submit' className="btn btn-primary">Cập nhật</button>
                    </div>
                </Form>
            </Formik>
        </>
    );
}
export default UpdateComponent;