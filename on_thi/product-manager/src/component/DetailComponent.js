import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {findProductById} from "../service/productService";

function DetailComponent(){
    const [product, setProduct] = useState(null);
    const {id} = useParams();

    useEffect(()=>{
        const fetchProduct = async () => {
            let product = await findProductById(id);
            setProduct({
                ...product
            })
        }
        fetchProduct()
    },[])

    function formatDate(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    if (!product) {
        return <p>Đang tải dữ liệu...</p>;
    }

    return(
        <>
            <h3>Chi tiết sản phẩm</h3>
            <label>Id:</label>
            <label>{product.id}</label><br/>
            <label>Tên sản phẩm:</label>
            <label>{product.name}</label><br/>
            <label>Loại sản phẩm:</label>
            <label>{product.categories.name}</label><br/>
            <label>Hãng sản xuất:</label>
            <label>{product.manufacturer}</label><br/>
            <label>Ngày nhập sản phẩm:</label>
            <label>{formatDate(product.startDate)}</label><br/>
            <label>Giá:</label>
            <label>{product.price} Vnđ</label><br/>
        </>
    );
}

export default DetailComponent;