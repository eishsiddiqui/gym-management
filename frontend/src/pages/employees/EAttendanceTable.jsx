import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Input } from "antd";
import classes from "./EAttendanceTable.module.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export const EAttendanceTable = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "eaID",
      key: "eaID",
    },

    {
      title: "EMP NUMBER",
      dataIndex: "empNo",
      key: "empNo",
    },

    {
      title: "TimeStamp",
      dataIndex: "AttendanceTime",
      key: "AttendanceTime",
    },

    {
      title: "Status",
      dataIndex: "AttendanceStatus",
      key: "AttendanceStatus",
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
    axios.delete(`/api/eattendance/${record.eaID}`).then((res) => {
      console.log(res);
      setData(data.filter((member) => member.eaID !== record.eaID));
    });
  };

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios.get("/api/eattendance").then((res) => {
      setData(res.data.data);
    });
  }, []);

  const searchedData = useMemo(() => {
    return data.filter(
      (d) =>
        `${d.empNo}`?.includes(search) ||
        `${d.AttendanceTime}`?.includes(search)
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
