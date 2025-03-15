import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Input } from "antd";
import classes from "./ETypeTable.module.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const ETypeTable = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "ID",
      dataIndex: "eqID",
      key: "eqID",
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },

    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Admin ID",
      dataIndex: "empNo",
      key: "empNo",
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
    axios.delete(`/api/equipment/${record.eqID}`).then((res) => {
      console.log(res);
      setData(data.filter((member) => member.eqID !== record.eqID));
    });
  };

  const onUpdate = (record) => {
    navigate(`/dashboard/equipment/update-equipment/${record.eqID}`);
  };

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/api/equipment").then((res) => {
      setData(res.data.data);
    });
  }, []);

  const searchedData = useMemo(() => {
    return data.filter(
      (d) =>
        d.category?.toLowerCase().includes(search.toLowerCase()) ||
        `${d.purchaseDate}`?.includes(search) ||
        `${d.empNo}`?.includes(search) ||
        d.status?.toLowerCase().includes(search.toLowerCase())
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
