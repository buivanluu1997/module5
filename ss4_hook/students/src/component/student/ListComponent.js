import React, {useEffect, useRef, useState} from "react";
import {searchStudent} from "../../service/studentService";
import DeleteStudent from "./DeleteStudent";
import {Link} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import {getAllClasses} from "../../service/classesService";
import {useSelector} from "react-redux";

function ListComponent() {

    const [listStudent, setListStudent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [deleteStudent, setDeleteStudent] = useState({});
    const [classes, setClasses] = useState([]);

    const account = useSelector(state => state.user.account);

    const nameRef = useRef();
    const classIdRef = useRef();

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(2);
    const [totalPage, setTotalPage] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            const searchName = nameRef.current.value;
            const classId = classIdRef.current.value;
            const {data,total} = await searchStudent(searchName, classId, page, size);
            setListStudent(data);
            setTotalPage(Math.ceil(total/size));
        }
        fetchData();
    }, [isLoading, page])

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


    const handleSearchName = async () => {
        const searchName = nameRef.current.value;
        const classId = classIdRef.current.value;
        const {data,total} = await searchStudent(searchName, classId, page, size);
        setListStudent(data);
        setTotalPage(Math.ceil(total/size));
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

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPage) {
            setPage(page);
        }
    };


    return (
        <>
            <h1>Danh sách học sinh</h1>

            <p>
                {account&&(account.role==="ADMIN")?(<Link to={"/students/add"}>Thêm học sinh</Link>):("")}
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
                                {account&&((account.role==="ADMIN")? (<button onClick={() => (
                                    handleShowModal(student))} className={'btn btn-sm btn-danger'}>Xoá
                                </button>):(""))}
                            </td>
                            <td>
                                {account &&
                                    <Link to={'/students/detail/' + student.id} className="btn btn-sm btn-success">Chi tiết</Link>}
                            </td>
                            <td>
                                {account&&((account.role==="ADMIN")?(<Link to={'/students/edit/'+student.id} className="btn btn-sm btn-primary">Sửa</Link>):(""))}
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>


            {/* Phân trang */}
            <div className="pagination">
                <button className="btn btn-sm btn-secondary" disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Previous</button>
                {[...Array(totalPage)].map((_, index) => (
                    <button
                        key={index + 1}
                        className={`btn ${page === index + 1 ? "btn-sm btn-primary" : "btn-sm btn-outline-primary"}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button className="btn btn-sm btn-secondary" disabled={page === totalPage} onClick={() => handlePageChange(page + 1)}>Next</button>
            </div>


            <DeleteStudent isShowModal={isShowModal} deleteStudent={deleteStudent}
                           handleCloseModal={handleCloseModal}  handleIsLoading={handleIsLoading}/>

        </>
    )
}

export default ListComponent;