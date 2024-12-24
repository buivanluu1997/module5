import React, {useEffect, useRef, useState} from "react";
import {getAllCategory} from "../service/categoriesService";
import {searchProducts} from "../service/productService";
import {Link} from "react-router-dom";
import DeleteComponent from "./DeleteComponent";

function ListComponent() {
    const [productList, setProductList] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [deleteProduct, setDeleteProduct] = useState({});
    const [isShowModal, setIsShowModal] = useState(false);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(2);
    const [totalPage, setTotalPage] = useState(0);

    const searchNameRef = useRef();
    const categoryIdRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const searchName = searchNameRef.current.value;
            const categoryId = categoryIdRef.current.value;
            const {data, total} = await searchProducts(searchName, categoryId, page, size);
            setProductList(data);
            setTotalPage(Math.ceil(total / size));
        }
        fetchData();
    }, [isLoading, page]);

    useEffect(() => {
        const fetchData = async () => {
            const categories = await getAllCategory();
            setCategoryList(categories);
        }
        fetchData()
    }, []);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPage) {
            setPage(page);
        }
    };

    const handleSearch = async () => {
        const searchName = searchNameRef.current.value;
        const categoryId = categoryIdRef.current.value;
        const {data, total} = await searchProducts(searchName, categoryId, page, size);
        setProductList(data);
        setTotalPage(Math.ceil(total / size));
    }

    //định dạng ngay dd/mm/yyyy
    function formatDate(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const handleIsLoading = () => {
        setIsLoading(prevState => !prevState);
    }

    const handleShowModal = (product) => {
        setDeleteProduct({
            ...product
        });
        setIsShowModal(prevState => !prevState);
    }

    const handleCloseModal = () => {
        setIsShowModal(prevState => !prevState);
    }


    return (
        <>
            <h1>Danh sách sản phẩm</h1>

            <p><Link to={"/products/add"}>Thêm sản phẩm</Link></p>

            <form>
                <label>Tên sản phẩm:</label>
                <input ref={searchNameRef} placeholder={"Nhập tên sản phẩm"}/>
                <label>Loại sản phẩm:</label>
                <select ref={categoryIdRef}>
                    <option value={""}>------Chọn------</option>
                    {
                        categoryList.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
                <button type={"button"} onClick={handleSearch}>Tìm kiếm</button>
            </form>

            <table className="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Loại sản phẩm</th>
                    <th>Hãng sản xuất</th>
                    <th>Ngày nhập</th>
                    <th>Giá sản phẩm</th>
                    <th>Xoá</th>
                    <th>Sửa</th>
                </tr>
                </thead>
                <tbody>
                {
                    productList&&productList.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.categories.name}</td>
                            <td>{product.manufacturer}</td>
                            <td>{formatDate(product.startDate)}</td>
                            <td>{product.price} Vnđ</td>
                            <td>
                                <button onClick={() => (
                                    handleShowModal(product))} className={'btn btn-sm btn-danger'}>Xoá
                                </button>
                            </td>
                            <td>
                                <Link to={`/products/update/${product.id}`} className="btn btn-sm btn-primary" >Sửa</Link>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

            <DeleteComponent isShowModal={isShowModal} deleteProduct={deleteProduct}
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