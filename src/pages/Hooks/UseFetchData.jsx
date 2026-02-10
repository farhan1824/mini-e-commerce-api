import { useState, useEffect, use } from "react";
import { AuthContext } from "../../Firebase/Authentication/AuthContext";

const useFetchData = (endpoint) => {
    const { loading, setLoading } = use(AuthContext)
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!endpoint) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:3000/${endpoint}`);
                if (!res.ok) throw new Error("Network response was not ok");
                const result = await res.json();
                setData(result);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, loading, error };
};

export default useFetchData;