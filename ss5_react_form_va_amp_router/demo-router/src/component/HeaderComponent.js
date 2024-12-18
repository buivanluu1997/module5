import React from 'react';
import {Routes, Route, Link} from "react-router-dom";
import Home from "./page/Home";
import Navbar from "./page/Navbar";
import LinkPage from "./page/LinkPage";

function HeaderComponent() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/nav">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/link">Link</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>


            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/nav" element={<Navbar/>}/>
                <Route path="/link" element={<LinkPage/>}/>
            </Routes>
        </>

    );

}

export default HeaderComponent;