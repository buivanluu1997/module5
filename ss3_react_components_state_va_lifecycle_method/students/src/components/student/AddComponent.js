import React from 'react';
import {addStudent} from "../service/StudentService";

class AddComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {
                id: "",
                name: "",
                age: ""
            }
        }
    }

    handleOnChange(e) {
        this.setState(pre => ({
            ...pre,
            student: {
                ...this.state.student,
                [e.target.name]: e.target.value
            }
        }));
    }

    handleOnClick() {
        addStudent(this.state.student);
        this.props.changeIsLoading();
    }

    render() {
        return (
            <>
                <h1>Thêm sinh viên</h1>
                <input name={'id'} onChange={(e) => {
                    this.handleOnChange(e)
                }} placeholder={'Nhập ID'}/>
                <input name={'name'} onChange={(e) => {
                    this.handleOnChange(e)
                }} placeholder={'Nhập tên sinh viên'}/>
                <input name={'age'} onChange={(e) => {
                    this.handleOnChange(e)
                }} placeholder={'Nhập tuổi'}/>
                <button onClick={() => {
                    this.handleOnClick()
                }}>Thêm
                </button>
            </>

        )
    }
}

export default AddComponent;