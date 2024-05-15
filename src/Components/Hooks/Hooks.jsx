import React, { useEffect, useState } from "react";

const Hooks = () => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        "https://b9-a-assignment-11-server.vercel.app/blog"
      );
      const data = await res.json();
      setdata(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  return { data, loading };
};

export default Hooks;
