import React from "react";
import {deleteStudentById} from "../../service/StudentService";

function DeleteStudent({isShowModal, deleteStudent, handleCloseModal, handleIsLoading}){

    const handleDeleteStudent = () => {
        deleteStudentById(deleteStudent.id);
        handleIsLoading();
        handleCloseModal(); 
    }

    return (
        isShowModal&&<div className="modal" tabIndex="-1" style={{display:'block'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Xoá</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Bạn có muốn xoá {deleteStudent.name} không??</p>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleCloseModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button onClick={handleDeleteStudent} type="button" className="btn btn-primary">Xoá</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteStudent;