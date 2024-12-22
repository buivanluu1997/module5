import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {editContract, findContractById} from "../service/contractService";
import {getAllServiceType} from "../service/serviceTypeService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";

function EditComponent(){
    const {id} = useParams();
    const [contracts, setContracts] = useState(null)
    const navigate = useNavigate();
    const [serviceTypeList, setServiceTypeList] = useState([]);

    useEffect( () => {
        const fetchData = async () => {
            let contractDetail = await findContractById(id);
            console.log(id)
            setContracts({
                ...contractDetail,
                customers: {
                    ...contractDetail.customers,
                    gender: contractDetail.customers.gender.toString()
                }
            });
        }
        fetchData();
    }, [])



    useEffect(() => {
        const fetchData = async () => {
            let list = await getAllServiceType();
            setServiceTypeList(list);
        }
        fetchData()
    }, []);

    const handleValidate = Yup.object({
        customers: Yup.object().shape({
            name: Yup.string()
                .required("Tên khách hàng không được để trống")
                .matches(/^[A-ZÀ-Ỹ][a-zà-ỹ]*(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)*$/, "Tên khách hàng phải bắt đầu bằng chữ hoa và mỗi từ trong tên phải viết hoa, không chứa số và kí tự đặc biệt"),

            phone: Yup.string()
                .required("Số điện thoại không được để trống")
                .matches(/^0\d{9}$/, "Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0"),
            address: Yup.string()
                .required("Địa chỉ không được để trống")
                .matches(/^[\p{L}\p{N}\s,.-]+$/u, "Địa chỉ không được chứa ký tự đặc biệt ngoài dấu phẩy, dấu chấm và dấu gạch ngang")
        }),
        serviceTypes: Yup.string()
            .required("Vui lòng chọn loại dịch vụ")
            .test("is-selected", "Vui lòng chọn loại dịch vụ", value => value && value !== ""),
        codeContract: Yup.string()
            .required("Mã hợp đồng không được để trống"),
        startDate: Yup.date()
            .required("Ngày bắt đầu không được để trống")
            .min(new Date(), "Ngày bắt đầu phải từ hôm nay trở đi"),
        endDate: Yup.date()
            .required("Ngày kết thúc không được để trống")
            .min(Yup.ref('startDate'), "Ngày kết thúc phải sau ngày bắt đầu"),
        deposit: Yup.number()
            .required("Số tiền đặt cọc không được để trống")
            .min(0, "Số tiền đặt cọc phải lớn hơn hoặc bằng 0"),
        totalMoney: Yup.number()
            .required("Tổng tiền thanh toán không được để trống")
            .min(Yup.ref('deposit'), "Tổng tiền thanh toán phải lớn hơn hoặc bằng số tiền đặt cọc"),

    })

    if (!contracts) {
        return "";
    }

    const handleEditContract = async (value) => {

        const contracts = {
            ...value,
            serviceTypes: JSON.parse(value.serviceTypes),
            customers: {
                ...value.customers,
                gender: parseInt(value.customers.gender)
            }
        }
        await editContract(contracts);
        toast.success("Đã cập nhật thành công");
        navigate("/contracts");
    }

    return(
        <>
            <div className="container mt-5">
                <Formik
                    initialValues={contracts}
                    onSubmit={handleEditContract}
                    validationSchema={handleValidate}
                >
                    <Form>
                        <h3 className="text-center mb-4">Cập nhật hợp đồng</h3>

                        <div className="mb-3">
                            <label className="form-label">Tên khách hàng:</label>
                            <Field className="form-control" type="text" name="customers.name"/>
                            <ErrorMessage style={{color: "red"}} name="customers.name" component="div"/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Giới tính:</label>
                            <div>
                                <label className="form-check-label">
                                    <Field type="radio" name="customers.gender" value="1" id="male"
                                           className="form-check-input"/> Nam
                                </label>
                                <label className="form-check-label ms-3">
                                    <Field type="radio" name="customers.gender" value="0" id="female"
                                           className="form-check-input"/> Nữ
                                </label>
                            </div>
                            <ErrorMessage style={{color: "red"}} name="customers.gender" component="div"/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Số điện thoại:</label>
                            <Field className="form-control" type="text" name="customers.phone"/>
                            <ErrorMessage style={{color: "red"}} name="customers.phone" component="div"/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Địa chỉ:</label>
                            <Field className="form-control" type="text" name="customers.address"/>
                            <ErrorMessage style={{color: "red"}} name="customers.address" component="div"/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Loại dịch vụ:</label>
                            <Field as="select" name="serviceTypes" className="form-select">
                                <option value="">---Chọn---</option>
                                {serviceTypeList.map((serviceType) => (
                                    <option key={serviceType.id} value={JSON.stringify(serviceType)}>
                                        {serviceType.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage style={{color: "red"}} name="serviceTypes" component="div"/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Mã hợp đồng:</label>
                            <Field className="form-control" type="text" name="codeContract"/>
                            <ErrorMessage style={{color: "red"}} name="codeContract" component="div"/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Ngày bắt đầu:</label>
                            <Field className="form-control" type="date" name="startDate"/>
                            <ErrorMessage style={{color: "red"}} name="startDate" component="div"/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Ngày kết thúc:</label>
                            <Field className="form-control" type="date" name="endDate"/>
                            <ErrorMessage style={{color: "red"}} name="endDate" component="div"/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Số tiền đặt cọc:</label>
                            <Field className="form-control" type="number" name="deposit"/>
                            <ErrorMessage style={{color: "red"}} name="deposit" component="div"/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Tổng tiền thanh toán:</label>
                            <Field className="form-control" type="number" name="totalMoney"/>
                            <ErrorMessage style={{color: "red"}} name="totalMoney" component="div"/>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Câp nhật</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
}

export default EditComponent;