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
