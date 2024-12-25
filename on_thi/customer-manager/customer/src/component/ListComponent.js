import React, {useEffect, useRef, useState} from "react";
import {getAllCategory} from "../service/categoryService";
import {searchCustomers} from "../service/customerService";
import {Link} from "react-router-dom";

function ListComponent() {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(2);
    const [totalPage, setTotalPage] = useState(0);

    const searchNameRef = useRef();
    const categoryIdRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const searchName = searchNameRef.current.value;
            const categoryId = categoryIdRef.current.value;

            const {data, total} = await searchCustomers(searchName, categoryId, page, size);
            setCustomers(data);
            setTotalPage(Math.ceil(total / size));
        }
        fetchData();
    }, [isLoading, page]);

    useEffect(() => {
        const fetchDate = async () => {
            let list = await getAllCategory();
            setCategories(list)
        }
        fetchDate();
    }, [])

    //định dạng ngay dd/mm/yyyy
    function formatDate(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handleSearch = async () => {
        const searchName = searchNameRef.current.value;
        const categoryId = categoryIdRef.current.value;

        const {data, total} = await searchCustomers(searchName, categoryId, page, size);
        setCustomers(data);
        setTotalPage(Math.ceil(total / size));
    }

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPage) {
            setPage(page);
        }
    };

    return (
        <>
            <h1>Danh sach khach hang</h1>

            <p><Link to={"/customers/add"}>Thêm khách hàng mới</Link></p>

            <form>
                <label>Tìm tên:</label>
                <input ref={searchNameRef} placeholder={"Nhập tên cần tìm"}/>
                <label>Loại khách hàng:</label>
                <select ref={categoryIdRef}>
                    <option value="">----Chọn----</option>
                    {
                        categories.map((category) => (
                            <option value={category.id} key={category.id}>{category.name}</option>
                        ))
                    }
                </select>
                <button type={"button"} onClick={handleSearch}>Tìm kiếm</button>
            </form>

            <table className="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên khách hàng</th>
                    <th>Loại khách hàng</th>
                    <th>Sinh nhật</th>
                </tr>
                </thead>
                <tbody>
                {
                    customers && customers.map((customer, index) => (
                        <tr key={customer.id}>
                            <td>{index + 1}</td>
                            <td>{customer.name}</td>
                            <td>{customer.categories.name}</td>
                            <td>{formatDate(customer.birthDay)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

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