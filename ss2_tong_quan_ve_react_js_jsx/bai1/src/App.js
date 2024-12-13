import logo from './logo.svg';
import './App.css';

function App() {
  const phones = [{id: 1, name: "IPhone 15 pro", brand: "Apple", price: 1000},
      {id: 2, name: "SamSung S21", brand: "SamSung", price: 900},
      {id: 3, name: "Oppo A7", brand: "Oppo", price: 700}
  ]
  return (
    <div className="App">
        <h1>List Phone</h1>
        <table border="1">
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {phones.map((phone) =>(
                <tr key={phone.id}>
                    <td>{phone.id}</td>
                    <td>{phone.name}</td>
                    <td>{phone.brand}</td>
                    <td>{phone.price}$</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  );



}

export default App;
