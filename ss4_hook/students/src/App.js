import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import HeaderComponent from "./component/student/HeaderComponent";
import ListComponent from "./component/student/ListComponent";
import {Routes, Route} from "react-router-dom";
import AddComponent from "./component/student/AddComponent";
import DetailComponent from "./component/student/DetailComponent";
import {ToastContainer} from "react-toastify";
import React from "react";

function App() {
    return (
        <>
            <HeaderComponent/>
            <ToastContainer position="top-right" autoClose={1000}/>
            <Routes>
                <Route path={"/"} element={<ListComponent/>}/>
                <Route path={"/add"} element={<AddComponent/>}/>
                <Route path={"/detail/:id"} element={<DetailComponent/>}/>
            </Routes>
        </>
    );
}

export default App;
