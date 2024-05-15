import React, { useEffect, useState } from "react";
import { Table } from "antd";

const columns = [
  {
    title: "S.No",
    dataIndex: "serial",
    width: "10%",
  },
  {
    title: "Title",
    dataIndex: "name",
    filters: [
      {
        text: "surgery",
        value: "surgery",
      },
      {
        text: "Category 1",
        value: "Category 1",
      },
      {
        text: "Category 2",
        value: "Category 2",
      },
    ],
    onFilter: (value, record) => record.name.startsWith(value),
    width: "30%",
  },
  {
    title: "BlogOwner",
    dataIndex: "BlogOwner",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Owner-Profile",
    dataIndex: "OwnerProfile",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => record.address.startsWith(value),
    width: "40%",
  },
];
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
