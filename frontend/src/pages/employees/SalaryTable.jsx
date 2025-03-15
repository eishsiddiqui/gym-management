import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Input } from "antd";
import classes from "./SalaryTable.module.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export const SalaryTable = () => {
  const columns = [
    {
      title: "EMPNO",
      dataIndex: "EMPNO",
      key: "EMPNO",
    },

    {
      title: "JOB",
      dataIndex: "job",
      key: "job",
    },

    {
      title: "BASIC",
      dataIndex: "salary",
      key: "salary",
    },

    {
      title: "BONUS",
      dataIndex: "bonuspay",
      key: "bonuspay",
    },

    {
      title: "DEDUCTIONS",
      dataIndex: "deductions",
      key: "deductions",
    },

    {
      title: "NET PAY",
      dataIndex: "netpay",
      key: "netpay",
    },

    {
      title: "SALARY DATE",
      dataIndex: "salarydate",
      key: "salarydate",
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
    axios.delete(`/api/salary/${record.sID}`).then((res) => {
      console.log(res);
      setData(data.filter((member) => member.sID !== record.sID));
    });
  };

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios.get("/api/salary").then((res) => {
      setData(res.data.data);
    });
  }, []);

  const searchedData = useMemo(() => {
    return data.filter(
      (d) =>
        `${d.fname} ${d.lname}`?.toLowerCase().includes(search.toLowerCase()) ||
        d.job?.toLowerCase().includes(search.toLowerCase()) ||
        `${d.EMPNO}`?.includes(search) ||
        `${d.salary}`?.includes(search) ||
        `${d.salarydate}`?.includes(search)
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
