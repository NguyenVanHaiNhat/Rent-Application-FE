
import axios from "axios";
const token = localStorage.getItem("authToken");
axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
export const searchAll = async (bedrooms, bathrooms, address, price,checkInDate,checkOutDate) => {

    try {
        const res = await axios.get(`http://localhost:8080?bedrooms=${bedrooms}&bathrooms=${bathrooms}&address=${address}&price=${price}&checkInDate=${checkInDate}&price=${checkOutDate}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching hosts:", error);
        throw error;
    }
}
export const getTop5MostBookedHouses = async () => {
    try {
        const res = await axios.get("http://localhost:8080/top5");
        return res.data;
    } catch (error) {
        console.error("Error fetching top 5 most booked houses:", error);
        throw error;
    }
};