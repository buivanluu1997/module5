import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import HeaderComponent from "./component/product/HeaderComponent";
import ListComponent from "./component/product/ListComponent";
import {Routes, Route} from "react-router-dom";
import AddComponent from "./component/product/AddComponent";
import DetailComponent from "./component/product/DetailComponent";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <>
            <HeaderComponent/>
            <ToastContainer position="top-right" autoClose={1000}/>
            <Routes>
                <Route path={"/add"} element={<AddComponent/>}/>
                <Route path={"/list"} element={<ListComponent/>}/>
                <Route path={"/detail/:id"} element={<DetailComponent/>}/>
            </Routes>

        </>
    );
}

export default App;