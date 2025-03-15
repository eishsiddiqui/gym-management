import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Input } from "antd";
import classes from "./MSTypeTable.module.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const MSTypeTable = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "MS_ID",
      dataIndex: "MSID",
      key: "MSID",
    },

    {
      title: "FNAME",
      dataIndex: "FNAME",
      key: "FNAME",
    },

    {
      title: "LNAME",
      dataIndex: "LNAME",
      key: "LNAME",
    },

    {
      title: "AMOUNT",
      dataIndex: "MTNAME",
      key: "MTNAME",
    },

    {
      title: "AMOUNT",
      dataIndex: "AMOUNT",
      key: "AMOUNT",
    },

    {
      title: "Trainer ID",
      dataIndex: "tid",
      key: "tid",
    },

    {
      title: "Start Date",
      dataIndex: "STARTDATE",
      key: "STARTDATE",
    },

    {
      title: "End Date",
      dataIndex: "ENDDATE",
      key: "ENDDATE",
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
    axios.delete(`/api/membership/${record.MSID}`).then((res) => {
      console.log(res);
      setData(data.filter((member) => member.MSID !== record.MSID));
    });
  };

  const onUpdate = (record) => {
    navigate(`/dashboard/membership/update-membership/${record.MSID}`);
  };

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/api/membership").then((res) => {
      setData(res.data.data);
    });
  }, []);

  const searchedData = useMemo(() => {
    return data.filter(
      (d) =>
        `${d.MSID}`?.includes(search) ||
        `${d.MID}`?.includes(search) ||
        `${d.tid}`?.includes(search) ||
        `${d.STARTDATE}`?.includes(search) ||
        `${d.ENDDATE}`?.includes(search) ||
        d.MTNAME?.toLowerCase().includes(search.toLowerCase()) ||
        `${d.FNAME} ${d.LNAME}`?.toLowerCase().includes(search.toLowerCase())
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
