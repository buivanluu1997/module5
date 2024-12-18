import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {detailProductById} from "../../service/ProductService";

function DetailComponent(){
    const {id} = useParams();

    const productId = parseInt(id);
    const product = detailProductById(productId);

    return(
        <>
            <h1>Chi tiết sản phẩm</h1>
            <label>ID:</label>
            <label>{product.id}</label><br/>
            <label>Tên sản phẩm:</label>
            <label>{product.name}</label><br/>
            <label>Hãng sản xuất:</label>
            <label>{product.brand}</label>
        </>
    );
}

export default DetailComponent;