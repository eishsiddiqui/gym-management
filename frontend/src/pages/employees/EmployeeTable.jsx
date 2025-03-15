import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Input } from "antd";
import classes from "./EmployeeTable.module.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const EmployeeTable = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "EMPNO",
      dataIndex: "EMPNO",
      key: "EMPNO",
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
      title: "EMAIL",
      dataIndex: "EMAIL",
      key: "EMAIL",
    },
    {
      title: "PHONENUM",
      dataIndex: "PHONENUM",
      key: "PHONENUM",
    },
    {
      title: "AREA",
      dataIndex: "AREA",
      key: "AREA",
    },
    {
      title: "CITY",
      dataIndex: "CITY",
      key: "CITY",
    },
    {
      title: "SALARY",
      dataIndex: "SALARY",
      key: "SALARY",
    },
    {
      title: "JOB",
      dataIndex: "JOB",
      key: "JOB",
    },

    {
      title: "HIREDATE",
      dataIndex: "HIREDATE",
      key: "HIREDATE",
    },

    {
      title: "ENDDATE",
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
    axios.delete(`/api/employee/${record.EMPNO}`).then((res) => {
      console.log(res);
      setData(data.filter((member) => member.EMPNO !== record.EMPNO));
    });
  };

  const onUpdate = (record) => {
    navigate(`/dashboard/employee/update-employees/${record.EMPNO}`);
  };

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/api/employee").then((res) => {
      setData(res.data.data);
    });
  }, []);

  const searchedData = useMemo(() => {
    return data.filter(
      (d) =>
        `${d.FNAME} ${d.LNAME}`?.toLowerCase().includes(search.toLowerCase()) ||
        d.EMAIL?.toLowerCase().includes(search.toLowerCase()) ||
        d.JOB?.toLowerCase().includes(search.toLowerCase()) ||
        d.CITY?.toLowerCase().includes(search.toLowerCase()) ||
        `${d.SALARY}`?.includes(search) ||
        `${d.ENDDATE}`?.includes(search) ||
        `${d.HIREDATE}`?.includes(search)
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
      />
    </>
  );
};
