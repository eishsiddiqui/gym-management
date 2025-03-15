import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Input } from "antd";
import classes from "./MAttendanceTable.module.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export const MAttendanceTable = () => {
  const columns = [
    {
      title: "MAttendance ID",
      dataIndex: "MAID",
      key: "MAID",
    },

    {
      title: "Member ID",
      dataIndex: "MID",
      key: "MID",
    },

    {
      title: "DATE",
      dataIndex: "ATTENDANCEDATE",
      key: "ATTENDANCEDATE",
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
    axios.delete(`/api/mattendance/${record.MAID}`).then((res) => {
      console.log(res);
      setData(data.filter((member) => member.MAID !== record.MAID));
    });
  };

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios.get("/api/mattendance").then((res) => {
      setData(res.data.data);
    });
  }, []);

  const searchedData = useMemo(() => {
    return data.filter(
      (d) =>
        `${d.MID}`?.includes(search) || `${d.ATTENDANCEDATE}`?.includes(search)
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
