import React, {useEffect, useRef, useState} from "react";
import {getListProduct, searchByName} from "../../service/ProductService";
import AddComponent from "./AddComponent";
import DeleteComponent from "./DeleteComponent";

const ListComponent = () => {
    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState({});

    useEffect(() => {
        setProductList((pre) => (
            [...getListProduct()]
        ))
    }, [isLoading]);

    const handleIsLoading = () => {
        setIsLoading((prevState) => !prevState);
    }

    const searchNameRef = useRef();
    const handleSearch = () => {
        const searchName = searchNameRef.current.value;
        const searchNameList = searchByName(searchName);
        setProductList(() => [...searchNameList]);
    }

    const handleShowModal = (product) => {
        setDeleteProduct(() =>({
                ...product
        }))
        setIsShowModal((prevState) => !prevState)
    }

    const handleCloseModal = () => {
        setIsShowModal(prevState => !prevState)
    }

    return (
        <>
            <h1>Danh sách sản phẩm</h1>

            <AddComponent handleIsLoading={handleIsLoading}/>

            <form>
                <input ref={searchNameRef}/>
                <button type={"button"} onClick={handleSearch}>Tìm kiếm</button>
            </form>

            <table className="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>ID</th>
                    <th>Tên sản phẩm</th>
                    <th>Hãng sản xuất</th>
                    <th>Xoá</th>
                </tr>
                </thead>
                <tbody>
                {productList && productList.map((product, index) => (
                    <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.brand}</td>
                        <td>
                            <button onClick={() => (
                                handleShowModal(product)
                            )} className={'btn btn-sm btn-danger'}>Xoá</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <DeleteComponent isShowModal={isShowModal} deleteProduct={deleteProduct}
                             handleCloseModal={handleCloseModal} handleIsLoading={handleIsLoading}/>
        </>
    );
}
export default ListComponent;