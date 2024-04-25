import axios from "axios";

export async function loginAccount(value) {
    try {
        return (await axios.post(`http://localhost:8080/account/login`, value)).data;
    } catch (error) {
        throw error.response
    }
}
export async function register(user) {
    const token = localStorage.getItem("authToken")
    try {
        await axios.post(`http://localhost:8080/account/registerr/user`, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (e) {
        console.log(e);
    }
}
export async function register1(host) {
    const token = localStorage.getItem("authToken")
    try {
        await axios.post(`http://localhost:8080/account/registerr/host`, host, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (e) {
        console.log(e);
    }
}