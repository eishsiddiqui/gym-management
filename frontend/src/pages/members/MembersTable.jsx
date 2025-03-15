import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Input } from "antd";
import classes from "./MembersTable.module.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const MembersTable = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "MID",
      dataIndex: "MID",
      key: "MID",
    },

    {
      title: "FNAME",
      dataIndex: "fname",
      key: "FNAME",
    },

    {
      title: "LNAME",
      dataIndex: "lname",
      key: "LNAME",
    },

    {
      title: "EMAIL",
      dataIndex: "email",
      key: "EMAIL",
    },

    {
      title: "PHONE_NUM",
      dataIndex: "phonenum",
      key: "PHONENUM",
    },

    {
      title: "EMERGENCY_NUM",
      dataIndex: "emergencynum",
      key: "EMERGENCYNUM",
    },

    {
      title: "AREA",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "CITY",
      dataIndex: "city",
      key: "city",
    },

    {
      title: "CREATION DATE",
      dataIndex: "creationdate",
      key: "CREATIONDATE",
    },

    {
      dataIndex: "edit",
      key: "edit",
      render: (_, record) => (
        <EditOutlined
          className={classes.editIcon}
          onClick={() => onUpdate(record)}
        />
      ),
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
    axios.delete(`/api/members/${record.MID}`).then((res) => {
      console.log(res);
      setData(data.filter((member) => member.MID !== record.MID));
    });
  };

  const onUpdate = (record) => {
    navigate(`/dashboard/members/update-members/${record.MID}`);
  };

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/api/members").then((res) => {
      setData(res.data.data);
    });
  }, []);

  const searchedData = useMemo(() => {
    return data.filter(
      (d) =>
        `${d.fname} ${d.lname}`?.toLowerCase().includes(search.toLowerCase()) ||
        d.city?.toLowerCase().includes(search.toLowerCase()) ||
        `${d.MID}`?.includes(search) ||
        `${d.creationdate}`?.includes(search)
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
      <Table
        className={classes.table}
        dataSource={searchedData}
        columns={columns}
        rowKey={"MID"}
      />
    </>
  );
};
