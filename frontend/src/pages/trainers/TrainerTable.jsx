import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Input } from "antd";
import classes from "./TrainerTable.module.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const TrainerTable = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Trainer ID",
      dataIndex: "TID",
      key: "TID",
    },

    {
      title: "NAME",
      dataIndex: "FNAME",
      key: "FNAME",
    },

    {
      title: "SHIFT",
      dataIndex: "SNAME",
      key: "SNAME",
    },

    {
      title: "MTID",
      dataIndex: "MTID",
      key: "MTID",
    },

    {
      title: "MEMBERSHIP TYPE",
      dataIndex: "MTNAME",
      key: "MTNAME",
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
    axios.delete(`/api/trainer/${record.TID}`).then((res) => {
      console.log(res);
      setData(data.filter((member) => member.TID !== record.TID));
    });
  };

  const onUpdate = (record) => {
    navigate(`/dashboard/trainer/update-trainer/${record.TID}`);
  };

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios.get("/api/trainer").then((res) => {
      setData(res.data.data);
    });
  }, []);

  const searchedData = useMemo(() => {
    return data.filter(
      (d) =>
        d.MTNAME?.toLowerCase().includes(search.toLowerCase()) ||
        d.SNAME?.toLowerCase().includes(search.toLowerCase()) ||
        `${d.MTID}`?.includes(search) ||
        `${d.TID}`?.includes(search)
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
