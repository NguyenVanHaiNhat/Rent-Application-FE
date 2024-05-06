import axios from "axios";
const token = localStorage.getItem("authToken");
axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
export const findAccountDetailById = async (id) => {

    try {
        const res = await axios.get(`http://localhost:8080/account/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching host detail:", error);
        throw error;
    }
}

export const editAccount = async (account) => {
    const res = await axios.put("http://localhost:8080/account/update/infor/" + account.id, account,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}
