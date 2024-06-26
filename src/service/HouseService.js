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
export const findHouseImageById = async (id) => {

    try {
        const res = await axios.get(`http://localhost:8080/api/house/detail/image/${id}`
        );
        return res.data;

    } catch (error) {
        console.error("Error fetching host detail:", error);
        throw error;
    }
}
export const postHouse = async (house) =>
{
    const res = await axios.post(`http://localhost:8080/api/house/post-house`, house, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export const postMultipleImage = async (image) => {
    const res = await axios.post("http://localhost:8080/api/image/" + image.id_house, image);
    return res.data;
}
export const postImageHouse = async (id ,image) => {
    const res = await axios.post("http://localhost:8080/api/image/" + id, image)
    return res.data;
}
export const updateHouseStatus = async (id, newStatus) => {
    try {
        const res = await axios.put(`http://localhost:8080/api/house/${id}/status/${newStatus}`);
        return res.data;

    } catch (error) {
        console.error("Error updating account status:", error);
        throw error;
    }
};