import axios from "axios";
const token = localStorage.getItem("authToken");
axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

export const addNewRate = async (id, rate, id_account) => {
    const res = await axios.post(`http://localhost:8080/api/rate/create/${id}`, rate,
        {
            params: {
                id_account : id_account
            }
        },{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
}

export const findAllRate = async (id) => {
    const res = await axios.get(`http://localhost:8080/api/rate/${id}`);
    return res.data;
}

export const checkRate = async (id_house,id_account) => {
    const res = await axios.get(`http://localhost:8080/checkIdAccount`,
        {
            params: {
                id_house: id_house,
                id_account : id_account
            }
        });

    return res.data;
}