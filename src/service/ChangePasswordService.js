import axios from 'axios';

export const changePassword = async (values) => {
    const token = localStorage.getItem('authToken');
    try {
        const res = await axios.put('http://localhost:8080/change-password', values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};