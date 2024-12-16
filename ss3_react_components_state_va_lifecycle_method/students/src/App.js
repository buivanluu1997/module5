import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import HeaderComponent from "./components/student/HeaderComponent";
import ListComponent from "./components/student/ListComponent";


function App() {

  return (
   <>
       <HeaderComponent/>
       <ListComponent/>
   </>
  );
}

export default App;
