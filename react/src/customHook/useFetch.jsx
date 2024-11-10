import { useEffect, useState } from "react";
import AxiosClient from "../Axios/Axios";

const useFetch = (url) =>{
    const [data, setData] = useState(null);

    useEffect(()=>{
        AxiosClient.get(url)
        .then((res)=>{
            setData(res.data)
        })
        .catch((res)=>{
            console.log(res)
        })
    },[url]);

    return [data];
}

export default useFetch;
