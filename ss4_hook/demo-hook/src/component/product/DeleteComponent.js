import React from "react";
import {deleteProductById} from "../../service/ProductService";

function DeleteComponent({isShowModal, deleteProduct, handleCloseModal, handleIsLoading}){

    const deleteOnclickProduct = () => {
        deleteProductById(deleteProduct.id);
        handleIsLoading();
        handleCloseModal();
    }

    return (
            isShowModal&&<div className="modal" tabIndex="-1" style={{display:'block'}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Xoá</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <span>Bạn có muốn xoá </span>
                            <span style={{color:'red'}}>{deleteProduct.name} ??</span>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleCloseModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button onClick={deleteOnclickProduct} type="button" className="btn btn-primary">Xoá</button>
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default DeleteComponent;