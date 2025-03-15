import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Input } from "antd";
import classes from "./TCertificationsTable.module.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export const CertificationsTable = () => {
  const columns = [
    {
      title: "Trainer ID",
      dataIndex: "tid",
      key: "tid",
    },

    {
      title: "FNAME",
      dataIndex: "fname",
      key: "fname",
    },

    {
      title: "LNAME",
      dataIndex: "lname",
      key: "lname",
    },

    {
      title: "CID ",
      dataIndex: "cid",
      key: "cid",
    },

    {
      title: "CNAME",
      dataIndex: "cname",
      key: "cname",
    },

    {
      title: "Issue Date",
      dataIndex: "issuedate",
      key: "issuedate",
    },
  ];

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/api/tcertifications").then((res) => {
      setData(res.data.data);
    });
  }, []);

  const searchedData = useMemo(() => {
    return data.filter(
      (d) =>
        `${d.cid}`?.includes(search) ||
        `${d.tid}`?.includes(search) ||
        `${d.cname}`?.toLowerCase().includes(search.toLowerCase()) ||
        `${d.fname} ${d.lname}`?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);
  return (
    <>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className={classes.searchBar}
      />
      <Table dataSource={searchedData} columns={columns} />
    </>
  );
};
