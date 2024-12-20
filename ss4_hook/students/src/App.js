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
import EditComponent from "./component/student/EditComponent";
import LoginComponent from "./component/student/LoginComponent";
import HomeComponent from "./component/student/HomeComponent";

function App() {
    return (
        <>
            <HeaderComponent/>
            <ToastContainer position="top-right" autoClose={1000}/>
            <Routes>
                <Route path={"/students"} element={<ListComponent/>}/>

                <Route path={"/login"} element={<LoginComponent/>}/>

                <Route path={"/students/add"} element={<AddComponent/>}/>

                <Route path={"/students/edit/:id"} element={<EditComponent/>}/>

                <Route path={"/students/detail/:id"} element={<DetailComponent/>}/>

                <Route path={"/home"} element={<HomeComponent/>}/>
            </Routes>
        </>
    );
}

export default App;
