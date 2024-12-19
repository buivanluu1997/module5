import React, {useEffect, useRef, useState} from "react";
import {getAllStudent, searchStudent} from "../../service/StudentService";
import DeleteStudent from "./DeleteStudent";
import {Link, Outlet} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import {getAllClasses} from "../../service/ClassesService";

function ListComponent() {

    const [listStudent, setListStudent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [deleteStudent, setDeleteStudent] = useState({});
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const list = await getAllStudent();
            setListStudent(list);
        }
        fetchData();
    }, [isLoading])

    useEffect(() => {
        const fetchData = async () => {
            let list = await getAllClasses();
            setClasses(list)
        }
        fetchData();
    }, []);

    const handleIsLoading = () => (
        setIsLoading(prevState => !prevState)
    )

    const nameRef = useRef();
    const classIdRef = useRef();
    const handleSearchName = async () => {
        const searchName = nameRef.current.value;
        const classId = classIdRef.current.value;
        const searchListName = await searchStudent(searchName, classId);
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
                <Link to={"/students/add"}>Thêm học sinh</Link>
            </p>

            <form>
                <label>Tên:</label>
                <input ref={nameRef} placeholder={'Nhập tên cần tìm'}/>
                <label>Lớp</label>
                <select ref={classIdRef}>
                    <option  value={""}>----Chọn-----</option>
                    {
                        classes.map((clas) => (
                            <option key={clas.id} value={clas.id}>{clas.name}</option>
                        ))
                    }
                </select>
                <button className={'btn btn-sm btn-secondary'} type={"button"} onClick={handleSearchName}>Tìm kiếm</button>
            </form>

            <table className="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>ID</th>
                    <th>Tên học sinh</th>
                    <th>Tuổi</th>
                    <th>Lớp học</th>
                    <th>Xoá</th>
                    <th>Chi tiết</th>
                    <th>Sửa</th>
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
                            <td>{student.classes.name}</td>
                            <td>
                                <button onClick={() => (
                                    handleShowModal(student))} className={'btn btn-sm btn-danger'}>Xoá
                                </button>
                            </td>
                            <td>
                                <Link to={'/students/detail/'+student.id} className="btn btn-sm btn-success">Chi tiết</Link>
                            </td>
                            <td>
                                <Link to={'/students/edit/'+student.id} className="btn btn-sm btn-primary">Sửa</Link>
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