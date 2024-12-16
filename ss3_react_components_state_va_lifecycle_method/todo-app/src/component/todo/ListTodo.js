import React from "react";
import {getAllTodo} from "../service/TodoService";
import AddTodo from "./AddTodo";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listTodo: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState(pre => ({
            ...pre,
            listTodo: getAllTodo()
        }))
    }

    changeIsLoading() {
        this.setState(pre => ({
            isLoading: !pre.isLoading
        }))
    }


    render() {
        return (
            <>
                <h1>Danh Sách Công Việc</h1>

                <AddTodo changeIsLoading={() => {
                    this.changeIsLoading()
                }}/>

                <table>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Tên công việc</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.listTodo.map((todo, index) => (
                            <tr key={todo.id}>
                                <td>{index + 1}</td>
                                <td>{todo.id}</td>
                                <td>{todo.item}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </>

        )
    }
}

export default Todo;