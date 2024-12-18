import React, {useEffect, useRef, useState} from "react";
import {getAllStudent, searchStudent} from "../../service/StudentService";
import DeleteStudent from "./DeleteStudent";
import {Link} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'

function ListComponent() {

    const [listStudent, setListStudent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [deleteStudent, setDeleteStudent] = useState({});

    useEffect(() => {
        setListStudent((prevState) => (
                [...getAllStudent()]
            )
        )
    }, [isLoading])


    const handleIsLoading = () => (
        setIsLoading(prevState => !prevState)
    )

    const nameRef = useRef();
    const handleSearchName = () => {
        const searchName = nameRef.current.value;
        const searchListName = searchStudent(searchName);
        setListStudent(() => (
            [...searchListName]
        ))
    }

    const handleShowModal = (student) => {
        setDeleteStudent(() => (
            {...student}
        ))
        setIsShowModal(prevState => !prevState);
    }

    const handleCloseModal = () => {
        setIsShowModal(prevState => !prevState)
    }

    return (
        <>
            <h1>Danh sách học sinh</h1>

            <p>
                <Link to={"/add"}>Thêm học sinh</Link>
            </p>

            <form>
                <input ref={nameRef} placeholder={'Nhập tên cần tìm'}/>
                <button type={"button"} onClick={handleSearchName}>Tìm kiếm</button>
            </form>

            <table className="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>ID</th>
                    <th>Tên học sinh</th>
                    <th>Tuổi</th>
                    <th>Xoá</th>
                    <th>Chi tiết</th>
                </tr>
                </thead>
                <tbody>
                {
                    listStudent && listStudent.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>
                                <button onClick={() => (
                                    handleShowModal(student))} className={'btn btn-sm btn-danger'}>Xoá</button>
                            </td>
                            <td>
                                <Link to={`/detail/${student.id}`} className="btn btn-sm btn-success">Chi tiết</Link>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <DeleteStudent isShowModal={isShowModal} deleteStudent={deleteStudent}
                           handleCloseModal={handleCloseModal}  handleIsLoading={handleIsLoading}/>
        </>
    )
}

export default ListComponent;