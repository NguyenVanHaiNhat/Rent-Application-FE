import axios from "axios";
const token = localStorage.getItem("authToken");
axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
export const findHouseDetailById = async (id) => {

    try {
        const res = await axios.get(`http://localhost:8080/api/house/${id}`,{
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

export const editHouse = async (house) => {
    const res = await axios.put("http://localhost:8080/api/house/" + house.id, house,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}