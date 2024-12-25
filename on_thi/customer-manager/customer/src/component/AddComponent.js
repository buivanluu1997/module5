import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {addCustomer} from "../service/customerService";
import {toast} from "react-toastify";
import {getAllCategory} from "../service/categoryService";

function AddComponent() {
    const [customer, setCustomer] = useState({name:"", categories:"", birthDay:""});
    const [categoryList, setCategoryList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            let list = await getAllCategory();
            setCategoryList(list);
        }
        fetchData();
    }, []);

    const handleAddCustomer = async (value) => {
        let customer = {
            ...value,
            categories: JSON.parse(value.categories),
        };
        await addCustomer(customer);
        toast.success("Đã thêm thành công");
        navigate("/customers");

    }

    return (
        <>
            <h3>Thêm khách hàng</h3>

            <Formik initialValues={customer} onSubmit={handleAddCustomer}>
                <Form>
                    <div>
                        <label>Tên khách hàng</label>
                        <Field type="text" name={"name"}/>
                    </div>
                    <br/>
                    <div>
                        <label>Loại khách hàng</label>
                        <Field as="select" name={"categories"}>
                            {
                                categoryList.map(category => (
                                    <option key={category} value={JSON.stringify(category)}>{category.name}</option>
                                ))
                            }
                        </Field>
                    </div>
                    <br/>
                    <div>
                        <label>Ngày sinh nhật</label>
                        <Field type="date" name={"birthDay"}/>
                    </div>
                    <br/>
                    <div >
                        <button type="submit" className="btn btn-primary">Thêm</button>
                    </div>
                </Form>
            </Formik>
        </>
    );
}

export default AddComponent;