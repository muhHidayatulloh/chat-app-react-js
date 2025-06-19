import { useEffect, useState } from "react";
import axios from "axios";

const Portofolio = () => {
    const [datas, setData] = useState([]);

    const API_URL = "https://api.unsplash.com/photos/?client_id=pjK6aoxGy95pdG0lit34w1Sxmc7g_Nqeeg0lhtOqTII"; // Ganti dengan endpoint API Anda
    const ACCESS_KEY = 'pjK6aoxGy95pdG0lit34w1Sxmc7g_Nqeeg0lhtOqTII';

    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL);

            console.log("Data fetched:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        const getData = async () => {
            const result = await fetchData();
            setData(result);
        };

        getData();
    }, []);

    return (
        <div>
            <h1>Data from API:</h1>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          
                {datas.map((row) => {
                   <p>li</p>
                })}
        </div>
    );
};

export default Portofolio;
