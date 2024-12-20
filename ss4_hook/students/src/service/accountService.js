import axios from "axios";

export async function checkLogin(loginInfo) {
    try {
        const response = await axios.get("http://localhost:8080/accounts");
        console.log("-------------------lisst acotunt-----------")
        console.log(response.data)
        const account = response.data.find(ac => ac.username === loginInfo.username && ac.password === loginInfo.password);
        return account;
    } catch (e) {
        return null;
    }


}