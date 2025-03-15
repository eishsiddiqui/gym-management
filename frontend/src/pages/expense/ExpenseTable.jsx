import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Input } from "antd";
import classes from "./ExpenseTable.module.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export const ExpenseTable = () => {
  const columns = [
    {
      title: "Expense ID",
      dataIndex: "eID",
      key: "EID",
    },

    {
      title: "Date",
      dataIndex: "ExDate",
      key: "EXDATE",
    },

    {
      title: "Type",
      dataIndex: "Type",
      key: "TYPE",
    },

    {
      title: "Amount",
      dataIndex: "Amount",
      key: "AMOUNT",
    },

    {
      title: "Admin ID",
      dataIndex: "empNo",
      key: "empNo",
    },

    {
      dataIndex: "delete",
      key: "delete",
      render: (_, record) => (
        <DeleteOutlined
          className={classes.deleteIcon}
          onClick={() => {
            onDelete(record);
          }}
        />
      ),
    },
  ];

  const onDelete = (record) => {
    axios.delete(`/api/expense/${record.eID}`).then((res) => {
      console.log(res);
      setData(data.filter((member) => member.eID !== record.eID));
    });
  };

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios.get("/api/expense").then((res) => {
      setData(res.data.data);
    });
  }, []);

  const searchedData = useMemo(() => {
    return data.filter(
      (d) =>
        `${d.empNo}`?.includes(search) ||
        `${d.ExDate}`?.includes(search) ||
        d.Type?.toLowerCase().includes(search.toLowerCase())
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
