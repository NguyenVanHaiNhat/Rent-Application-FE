import axios from "axios";

export const addNewRate = async (id, rate) => {
    const res = await axios.post(`http://localhost:8080/api/rate/create/${id}`, rate);
    return res.data;
}

export const findAllRate = async (id) => {
    const res = await axios.get(`http://localhost:8080/api/rate/${id}`);
    return res.data;
}