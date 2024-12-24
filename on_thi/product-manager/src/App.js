
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import HeaderComponent from "./component/HeaderComponent";
import {Route, Routes} from "react-router-dom";
import ListComponent from "./component/ListComponent";
import HomeComponent from "./component/HomeComponent";
import AddComponent from "./component/AddComponent";
import {ToastContainer} from "react-toastify";
import UpdateComponent from "./component/UpdateComponent";
import DetailComponent from "./component/DetailComponent";

function App() {
    return (
        <>
            <HeaderComponent/>
            <ToastContainer position="top-right" autoClose={1000}/>
            <Routes>
                <Route path="/products" element={<ListComponent/>}/>
                <Route path="/" element={<HomeComponent/>}/>
                <Route path="/products/add" element={<AddComponent/>}/>
                <Route path="/products/update/:id" element={<UpdateComponent/>}/>
                <Route path="/products/detail/:id" element={<DetailComponent/>}/>
            </Routes>
        </>
    );
}

export default App;
