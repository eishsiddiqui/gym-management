import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Button, Input } from "antd";
import classes from "./CertificationsTable.module.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const CertificationsTable = () => {
  const navigate = useNavigate();
  const columns = [
    {
      title: "CID",
      dataIndex: "cID",
      key: "CID",
    },

    {
      title: "CNAME",
      dataIndex: "cName",
      key: "CNAME",
    },

    {
      title: "Issue Date",
      dataIndex: "IssueDate",
      key: "ISSUEDATE",
    },

    {
      title: "Issuer",
      dataIndex: "Issuer",
      key: "ISSUER",
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
    axios.delete(`/api/certifications/${record.cID}`).then((res) => {
      console.log(res);
      setData(data.filter((member) => member.cID !== record.cID));
    });
  };

  const onBack = () => {
    navigate("/dashboard/trainer/add-tcertification");
  };

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/api/certifications").then((res) => {
      setData(res.data.data);
    });
  }, []);

  const searchedData = useMemo(() => {
    return data.filter(
      (d) =>
        `${d.cName}`?.toLowerCase().includes(search.toLowerCase()) ||
        d.Issuer?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);
  return (
    <>
      <div className={classes.buttonGroup}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className={classes.searchBar}
        />
        <Button onClick={onBack} type="primary">
          Back
        </Button>
      </div>
      <Table dataSource={searchedData} columns={columns} />
    </>
  );
};
