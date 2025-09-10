import axios from "axios";

export interface SignUpTesting {
    email: string;
    message: string;
}

export const sendSignUpTesting = async (data: SignUpTesting) => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/public-testing`, data);
    return response.data;
}