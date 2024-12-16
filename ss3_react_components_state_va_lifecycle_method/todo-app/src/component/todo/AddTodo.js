import React from 'react';
import {addTodo} from "../service/TodoService";

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Todo:{
                id:"",
                item:""
            }
        };
    }

    handleOnChange(e){
        this.setState(pre => ({
            ...pre,
            Todo:{
                ...this.state.Todo,
                [e.target.name]: [e.target.value]
            }
        }))
    }

    handleSubmit(){
        addTodo(this.state.Todo);
        this.props.changeIsLoading();
        
    }

    render() {
        return(
            <>
                <h1>Thêm công việc</h1>
                <input name={'id'} onChange={(e) =>(
                    this.handleOnChange(e)
                )} placeholder={'Nhập vào id'}/>
                <input name={'item'} onChange={(e)=>(
                    this.handleOnChange(e)
                )} placeholder={'Nhập vào công việc'}/>
                <button onClick={()=>(
                    this.handleSubmit()
                )}>Thêm</button>
            </>
        )
    }
}
export default AddTodo;