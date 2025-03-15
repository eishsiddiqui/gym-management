import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import classes from "./MTypeTable.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export const MTypeTable = () => {
  const columns = [
    {
      title: "MTID",
      dataIndex: "mtID",
      key: "MTID",
    },

    {
      title: "MT_NAME",
      dataIndex: "mtName",
      key: "MTNAME",
    },

    {
      title: "DURATION",
      dataIndex: "Duration",
      key: "DURATION",
    },

    {
      title: "PRICE",
      dataIndex: "Price",
      key: "PRICE",
    },

    {
      title: "TRAINERLEVEL",
      dataIndex: "TrainerLevel",
      key: "TRAINERLEVEL",
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
    axios.delete(`/api/membershiptype/${record.mtID}`).then((res) => {
      console.log(res);
      setData(data.filter((member) => member.mtID !== record.mtID));
    });
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/api/membershiptype").then((res) => {
      setData(res.data.data);
    });
  }, []);
  return <Table dataSource={data} columns={columns} />;
};
