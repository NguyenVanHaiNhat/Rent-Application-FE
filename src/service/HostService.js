import axios from "axios";


const token = localStorage.getItem("authToken");
axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

export const findAllHost = async () => {

    try {
        const res = await axios.get("http://localhost:8080/api/host/dto",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        },
            );
        return res.data;
    } catch (error) {
        console.error("Error fetching hosts:", error);
        throw error;
    }
}


export const findHostDetailById = async (id) => {

    try {
        const res = await axios.get(`http://localhost:8080/api/host/dto/${id}`,{
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

export const findAllListHouse = async (id,name,status) => {

    try {
        const res = await axios.get(`http://localhost:8080/api/house/owner/${id}?name=${name}&status=${status}`,{
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
export const findAllListHouseRented = async (id) => {

    try {
        const res = await axios.get(`http://localhost:8080/api/house/ownerRented/${id}`,{
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
export const findAllListHouseMaintenance = async (id) => {

    try {
        const res = await axios.get(`http://localhost:8080/api/house/ownerMaintenance/${id}`,{
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
export const findAllListHouseAvailable = async (id) => {

    try {
        const res = await axios.get(`http://localhost:8080/api/house/ownerAvailable/${id}`,{
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
export const updateAccountStatus = async (id, newStatus) => {
    try {
        const res = await axios.put(`http://localhost:8080/api/host/${id}/status/${newStatus}`);
        return res.data;

    } catch (error) {
        console.error("Error updating account status:", error);
        throw error;
    }
};
export const getListSchedule = async (id) => {
    try {
        const res = await axios.get("http://localhost:8080/api/host/" + id);
        return res.data
    } catch (e) {
        console.log(e)
    }
}