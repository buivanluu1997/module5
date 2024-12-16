import React from 'react';
import {deleteStudent, getAll} from "../service/StudentService";
import AddComponent from "./AddComponent";

class ListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listStudent: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState(pre => ({
            ...pre,
            listStudent: getAll()
        }))
    }

    changeIsLoading(){
        this.setState(pre =>({
            isLoading: !pre.isLoading
        }))
    }

    deleteStudentId(id){
        deleteStudent(id)
        this.setState({
            listStudent: getAll()
        })
        console.log(getAll())
    }

    render() {
        return (
            <>
                <h3>Danh sách sinh viên</h3>

                <AddComponent changeIsLoading={() =>{this.changeIsLoading()}}/>

                <table className="table table-striped table-bordered table-hover">
                    <thead className="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>Id</th>
                        <th>Tên sinh viên</th>
                        <th>Tuổi</th>
                        <th>Xoá</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.listStudent.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td><button onClick={()=>(this.deleteStudentId(student.id))}>Xoá</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </>
        );
    }
}

export default ListComponent;