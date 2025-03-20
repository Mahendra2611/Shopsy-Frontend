import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Import react-hot-toast

const useAPI = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const callApi = async ({ url, method = "GET", data = {}, headers = {} }) => {
        setLoading(true);
        setError(null);

        url = `http://localhost:3000/${url}`;
        console.log(url);

        try {
            const response = await axios({
                url,
                method,
                data,
                headers,
                withCredentials: true
            });

            console.log(response);
            if (response && (response.status === 201 || response.status === 200)) {
                return response.data;
            } else {
                setLoading(false);
                return null;
            }
        } catch (err) {
            console.log(err)
            const errorMessage = err?.response?.data?.message||err?.message || "Something went wrong";
            setError(errorMessage);
            toast.error(errorMessage); 
            setLoading(false);
            return null;
        } finally {
            setLoading(false);
        }
        console.log(loading)
    };

    return { callApi, loading, error };
};

export default useAPI;
