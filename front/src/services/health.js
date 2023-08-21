import axios from 'axios';
const token = localStorage.getItem("token");


const url = "http://localhost:8080/health";

export const result = async (healthData) => {
    try {
        const response = await axios.post(url, healthData, {
            headers: {
                'x-access-token': token
            }
        });

        if (response.status === 200) {
        
            return response.data
        } else {
            console.log("Error Response:", response.data);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
};

    
