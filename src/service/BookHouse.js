import axios from "axios";
import moment from 'moment';

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
