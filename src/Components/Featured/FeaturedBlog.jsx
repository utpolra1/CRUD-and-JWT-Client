import React, { useEffect, useState } from "react";
import { Table } from "antd";


const FeaturedBlog = () => {
  const [datas, setDatas] = useState([]);
  console.log(datas);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://b9-a-assignment-11-server.vercel.app/featuredblogs"
        );
        const data = await res.json();
        setDatas(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const mappedData = datas.map((item, index) => ({
    ...item,
    key: index.toString(), // Ensure a unique key for each item
    serial: index + 1,
    name: item?.title,
    BlogOwner: item?.name,
    OwnerProfile: (
      <img className="w-10 h-10 rounded-full" src={item?.userPhoto}></img>
    ),
  }));

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table
      columns={columns}
      dataSource={mappedData}
      loading={loading}
      onChange={onChange}
    />
  );
};

export default FeaturedBlog;
