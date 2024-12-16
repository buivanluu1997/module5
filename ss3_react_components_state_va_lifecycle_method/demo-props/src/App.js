import logo from './logo.svg';
import './App.css';

function App() {
    const phones = [{id: 1, name: "Iphone 15", price: 1000, brand: "Apple"},
                                            {id: 2, name: "SamSung S21", price: 900, brand: "SamSung"},
                                            {id: 3, name: "Oppo A7", price: 500, brand: "Oppo"}]
    return (
        <div className="App">
            <Welcome phones={phones}/>
        </div>
    );
}

function Welcome(props) {
    return (
        <div>
            <h1>List Phone</h1>
            <table style={{border: '1px solid black', borderCollapse: 'collapse'}}>
                <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Price</th>
                </tr>
                {props.phones.map((phone, index) => (
                    <tr key={phone.id}>
                        <td>{index + 1}</td>
                        <td>{phone.name}</td>
                        <td>{phone.brand}</td>
                        <td>{phone.price}$</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default App;
