import React from "react";
import {deleteContractById} from "../service/contractService";

function DeleteComponent({isShowModal, deleteContract, handleCloseModal, handleIsLoading}) {

    const handleDeleteContract = async () => {
        await deleteContractById(deleteContract.id);
        handleIsLoading();
        handleCloseModal();
    }

    return (
        <>
            {isShowModal&&<div className="modal" tabIndex="-1" style={{display:'block'}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Xoá</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Bạn có muốn xoá {deleteContract.customers.name} không??</p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleCloseModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button onClick={handleDeleteContract} type="button" className="btn btn-primary">Xoá</button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>

    );
}
export default DeleteComponent;