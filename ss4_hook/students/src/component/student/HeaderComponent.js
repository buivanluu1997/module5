import {Link, NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/accountAction";

function HeaderComponent(){
    const account = useSelector(state => state.user.account);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout())
        navigate("/home")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/home">Trang chủ</Link>
                            </li>
                            <li className="nav-item">
                                {account&&<Link className="nav-link active" aria-current="page" to="/students/add">Thêm học
                                    sinh</Link>}
                            </li>
                            <li className="nav-item">
                                {account&&<Link className="nav-link" to="/students">Danh sách học sinh</Link>}
                            </li>
                            <li className="nav-item">
                                {!account&&<Link className="nav-link" to="/login">Đăng nhập</Link>}
                            </li>
                            <li className="nav-item">
                                {account&&<button onClick={handleLogout}>Đăng xuất</button>}
                            </li>
                            <li className="nav-item">
                                {account&&account.username}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default HeaderComponent;