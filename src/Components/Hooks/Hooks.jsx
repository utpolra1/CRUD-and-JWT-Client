import React, { useEffect, useState } from 'react';

const Hooks = () => {
    
    const [data, setdata]=useState([]);
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        const fetchData=async()=>{
            setLoading(true);
            const res=await fetch("http://localhost:5000/blog")
            const data =await res.json();
            setdata(data);
            setLoading(false);
        }
        fetchData();
    },[]);
    return{data, loading}
};

export default Hooks;