import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import classes from "./ATable.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const ATable = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "EMPNO",
      dataIndex: "empNo",
      key: "EMPNO",
    },

    {
      title: "UserName",
      dataIndex: "username",
      key: "username",
    },

    {
      title: "Password",
      dataIndex: "password",
      key: "password",
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
    axios.delete(`/api/admin/${record.empNo}`).then((res) => {
      console.log(res);
      setData(data.filter((member) => member.empNo !== record.empNo));
    });
  };

  const onUpdate = (record) => {
    navigate(`/dashboard/admin/update-admin/${record.empNo}`);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/api/admin").then((res) => {
      setData(res.data.data);
    });
  }, []);
  return <Table dataSource={data} columns={columns} />;
};
