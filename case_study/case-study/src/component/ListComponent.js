import React, {useEffect, useRef, useState} from "react";
import {getAllServiceType} from "../service/serviceTypeService";
import {searchContract} from "../service/contractService";
import {Link} from "react-router-dom";
import DeleteComponent from "./DeleteComponent";

function ListComponent(){
    const [contractList, setContractList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [serviceTypeList, setServiceTypeList] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(2);
    const [totalPage, setTotalPage] = useState(0);
    const [isShowModal, setIsShowModal] = useState(false);
    const [deleteContract, setDeleteContract] = useState({});
    const nameRef = useRef();
    const serviceTypeIdRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const searchName = nameRef.current.value;
            const serviceTypeId = serviceTypeIdRef.current.value;
            const {data, total} = await searchContract(searchName, serviceTypeId, page, size);
            setContractList(data);
            setTotalPage(Math.ceil(total / size));
        }
        fetchData()
    }, [isLoading, page]);

    useEffect(() => {
        const fetchData = async () => {
            const serviceTypeList = await getAllServiceType();
            setServiceTypeList(serviceTypeList);
        }
        fetchData()
    }, []);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPage) {
            setPage(page);
        }
    };
    const handleSearchName = async () => {
        const searchName = nameRef.current.value;
        const serviceTypeId = serviceTypeIdRef.current.value;
        const {data, total} = await searchContract(searchName, serviceTypeId, page, size);
        setContractList(data);
        setTotalPage(Math.ceil(total / size));
    }

    //định dạng ngay dd/mm/yyyy
    function formatDate(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handleShowModal = (contract) => {
        setDeleteContract(() => (
            {...contract}
        ))
        setIsShowModal(prevState => !prevState);
    }

    const handleIsLoading = () => (
        setIsLoading(prevState => !prevState)
    )

    const handleCloseModal = () => {
        setIsShowModal(prevState => !prevState)
    }

    return(
        <>
            <div className="container mt-5">
                <h1 className="text-center mb-4">Danh sách hợp đồng</h1>

                <div className="mb-4">
                    <Link to={"/contracts/add"} className="btn btn-primary">Thêm hợp đồng mới</Link>
                </div>

                <form className="mb-4">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Tên khách hàng:</label>
                            <input ref={nameRef} placeholder={'Nhập tên cần tìm'} className="form-control"/>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Loại dịch vụ:</label>
                            <select ref={serviceTypeIdRef} className="form-select">
                                <option value={""}>-------Chọn-------</option>
                                {serviceTypeList.map((serviceType) => (
                                    <option key={serviceType.id} value={serviceType.id}>{serviceType.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3 d-flex align-items-end">
                            <button className="btn btn-sm btn-secondary" type="button" onClick={handleSearchName}>Tìm
                                kiếm
                            </button>
                        </div>
                    </div>
                </form>

                <table className="table table-striped table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên khách hàng</th>
                        <th>Mã hợp đồng</th>
                        <th>Loại dịch vụ</th>
                        <th>Ngày bắt đầu</th>
                        <th>Ngày kết thúc</th>
                        <th>Đã đặt cọc</th>
                        <th>Tổng tiền</th>
                        <th>Chi tiết</th>
                        <th>Xoá</th>
                        <th>Sửa</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contractList && contractList.map((contract, index) => (
                        <tr key={contract.id}>
                            <td>{index + 1}</td>
                            <td>{contract.customers.name}</td>
                            <td>{contract.codeContract}</td>
                            <td>{contract.serviceTypes.name}</td>
                            <td>{formatDate(contract.startDate)}</td>
                            <td>{formatDate(contract.endDate)}</td>
                            <td>{contract.deposit} Vnđ</td>
                            <td>{contract.totalMoney} Vnđ</td>
                            <td>
                                <Link className="btn btn-sm btn-success" to={`/contracts/detail/${contract.id}`}>Chi
                                    tiết</Link>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-danger"
                                        onClick={() => handleShowModal(contract)}>Xoá
                                </button>
                            </td>
                            <td><Link to={`/contracts/edit/${contract.id}`} className="btn btn-sm btn-primary">Sửa</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <DeleteComponent isShowModal={isShowModal} deleteContract={deleteContract}
                             handleCloseModal={handleCloseModal} handleIsLoading={handleIsLoading}/>


            {/* Phân trang */}
            <div className="pagination">
                <button className="btn btn-sm btn-secondary" disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}>Previous
                </button>
                {[...Array(totalPage)].map((_, index) => (
                    <button
                        key={index + 1}
                        className={`btn ${page === index + 1 ? "btn-sm btn-primary" : "btn-sm btn-outline-primary"}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button className="btn btn-sm btn-secondary" disabled={page === totalPage}
                        onClick={() => handlePageChange(page + 1)}>Next
                </button>
            </div>
        </>
    );
}

export default ListComponent;