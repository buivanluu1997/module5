import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import {Route, Routes} from "react-router-dom";
import ListComponent from "./component/ListComponent";
import HeaderComponent from "./component/HeaderComponent";
import AddComponent from "./component/AddComponent";

function App() {
  return (
      <>
          <HeaderComponent/>
          <Routes>
              <Route path="/customers" element={<ListComponent/>} />
              <Route path="/customers/add" element={<AddComponent/>} />
          </Routes>

      </>
  );
}

export default App;
