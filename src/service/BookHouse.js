import axios from "axios";
import moment from 'moment';
import { format } from 'date-fns';

export const calculateTotalPrice = (days, price) => {
    return days * price;
};

export const bookHouse = async (startDate, endDate, houseId) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.post(
            'http://localhost:8080/bookAHouse',
            {
                start_date: moment(startDate).format('YYYY-MM-DD'),
                end_date: moment(endDate).format('YYYY-MM-DD'),
                idHouse: houseId,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );
        if (response.status === 201) {
            return { success: true };
        } else {
            return { success: false, message: 'Booking failed. Please try again.' };
        }
    } catch (error) {
        return { success: false, message: 'Booking failed. Please try again.' };
    }
};

export const checkDate = async (startDate, endDate, houseId) => {
    try {
        const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
        const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');

        const token = localStorage.getItem("authToken");
        const result = await axios.get(`http://localhost:8080/checkDate?start_date=${formattedStartDate}&end_date=${formattedEndDate}&id=${houseId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return result.data;
    } catch (e) {
        console.log(e);
    }
};
export const getAllHistory = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
        const res = await axios.get(`http://localhost:8080/history-booking/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
        );
        return res.data;
    } catch (error) {
        console.error("Error not found:", error);
        throw error;
    }
}

export const updateBookingStatus = async (id) => {
    try {
        const res = await axios.put(`http://localhost:8080/editStatus/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error updating bookings status:", error);
        throw error;
    }
};
export const getTotalIncome = async  (id) => {
    const token = localStorage.getItem('authToken');
    try {
        const  res = await axios.get(`http://localhost:8080/totalIncome`,{
            params : {
                id : id
            }
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    }catch (error) {
        console.error("Error not found:", error);
        throw error;
    }
}
export const getTotalIncomeRange = async  (id,startYear,startMonth,endYear,endMonth) => {
    const token = localStorage.getItem('authToken');
    try {
        const  res = await axios.get(`http://localhost:8080/totalIncomeRange`,{
            params: {
                id: id,
                startYear: startYear,
                startMonth: startMonth,
                endYear: endYear,
                endMonth: endMonth
            }
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    }catch (error) {
        console.error("Error not found:", error);
        throw error;
    }
}





