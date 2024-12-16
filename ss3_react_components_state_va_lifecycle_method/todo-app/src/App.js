import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min'
import HeaderComponent from "./component/todo/HeaderComponent";
import Todo from "./component/todo/ListTodo";

function App() {
    return (
        <>
            <HeaderComponent/>
            <Todo/>
        </>
    );
}

export default App;
