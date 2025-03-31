import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; 

const useAPI = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log(loading)
    const callApi = async ({ url, method = "GET", data = {}, headers = {} }) => {
        setLoading(true);
        setError(null);

         url = `http://localhost:3000/${url}`;
        // url = `https://shopsy-backend-one.vercel.app/${url}`;
       // url = `https://shopsy-backend-production.up.railway.app/${url}`;
        
        
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
           // setLoading(false);
            if (response && (response.status === 201 || response.status === 200)) {
                return response.data;
            } else {
               throw new Error()
            }
        } catch (err) {
            console.log(err)
            const errorMessage = err?.response?.data?.message||err?.response?.data?.errors[0] || "Something went wrong";
            setError(errorMessage);
            toast.error(errorMessage); 
           // setLoading(false);
            return null;
        } finally {
            setLoading(false);
        }
       
    };

    return { callApi, loading, error };
};

export default useAPI;
