import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import HeaderComponent from "./component/HeaderComponent";
import ListComponent from "./component/ListComponent";
import {Route, Routes} from "react-router-dom";
import HomeComponent from "./component/HomeComponent";
import AddComponent from "./component/AddComponent";
import {ToastContainer} from "react-toastify";
import DetailComponent from "./component/DetailComponent";
import EditComponent from "./component/EditComponent";

function App() {
    return (
        <>
            <HeaderComponent/>
            <ToastContainer position="top-right" autoClose={1000}/>
            <Routes>
                <Route path={"/"} element={<HomeComponent/>}/>
                <Route path="/contracts" element={<ListComponent/>}/>
                <Route path="/contracts/add" element={<AddComponent/>}/>
                <Route path="/contracts/detail/:id" element={<DetailComponent/>}/>
                <Route path="/contracts/edit/:id" element={<EditComponent/>}/>
            </Routes>
        </>
    );
}

export default App;
