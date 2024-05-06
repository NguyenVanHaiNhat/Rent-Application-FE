import axios from "axios";

export async function loginAccount(credentials) {  // Thay đổi tham số thành credentials
    try {
        return (await axios.post(`http://localhost:8080/account/login`, credentials)).data;
    } catch (error) {
        throw error.response;
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

export async function checkUserNameAccount(userName) {
    try {
        const token = localStorage.getItem("authToken")
        const result = await axios.get(`http://localhost:8080/account/checkUserName?userName=${userName}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return result.data;
    } catch (e) {
        console.log(e);
    }
}

export const findAllListUser = async () => {

    try {
        const token = localStorage.getItem("authToken")

        const res = await axios.get("http://localhost:8080/account-dto/user", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

export const findUserDetailById = async (id) => {
    try {
        const token = localStorage.getItem("authToken")

        const res = await axios.get(`http://localhost:8080/account-dto/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching user detail:", error);
        throw error;
    }
}
