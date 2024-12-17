import React, {useRef, useState} from "react";
import {addProduct} from "../../service/ProductService";

function AddComponent({handleIsLoading}) {

    const [product, setProduct] = useState({id: "", name: "", brand: ""});


    //hook useRef
    const idRef = useRef();
    const nameRef = useRef();
    const brandRef = useRef();

    /*const handleOnChange = (e) => {
        setProduct(prevState =>({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }*/

    const handleSubmit = () => {
        addProduct({
            id: idRef.current.value,
            name: nameRef.current.value,
            brand: brandRef.current.value
        })
        handleIsLoading();
    }




    return (
        <>
            <h3>Thêm sản phẩm</h3>
            <form>
                <label>Id:</label>
                <input name={"id"} ref={idRef} placeholder={"Nhập Id"}/>
                <label>Tên sản phẩm:</label>
                <input name={"name"} ref={nameRef} placeholder={"Nhập tên sản phẩm"}/>
                <label>Hãng sản xuất:</label>
                <input name={"brand"} ref={brandRef} placeholder={"Nhập hãng sản xuất"}/>
                <button type={"button"} onClick={handleSubmit}>Thêm
                </button>
            </form>
        </>
    );
}

export default AddComponent;