import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/accountAction";
import {useNavigate} from "react-router-dom";
import {checkLogin} from "../../service/accountService";
import {toast} from "react-toastify";
function LoginComponent(){

    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const usernameRef =useRef();
    const passwordRef = useRef();
    const handleLogin = async () => {
        let username = usernameRef.current.value;
        let password = passwordRef.current.value;

        const loginInfo = {
            username: username,
            password: password,
        }
        console.log(loginInfo)
        //Call API để check login => kiểm tra có trong DB => ok
        /*const account = await checkLogin(loginInfo);
        console.log("==================================")
        console.log(account)
        if (account != null) {
            dispatch(login(account));
            navigate("/students");
            toast.success("Đăng nhập thành công")
        }else {
            toast.error("Đăng nhập thất bại")
        }*/


        //redux-thunk
        let isLoginSuccess = await checkLogin(loginInfo);
        if(isLoginSuccess){
            dispatch(login(loginInfo))
            toast.success("Đăng nhập thành công");
            navigate("/students");
        } else {
            toast.error("Đăng nhập thất bại");
        }

    }



    return(
        <form>
            <h3>Đăng Nhập </h3>
            <div>
                <label>Tên đăng nhập</label>
                <input ref={usernameRef} name={'username'}/>
            </div>
            <div>
                <label>Mật khẩu</label>
                <input ref={passwordRef} name={'password'}/>
            </div>
            <div>
                <button onClick={handleLogin} type={"button"}>Đăng nhập</button>
            </div>
        </form>
    );
}

export default LoginComponent;