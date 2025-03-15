import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Input } from "antd";
import classes from "./MAssessmentTable.module.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const MAssessmentTable = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "MEMBER ID",
      dataIndex: "MID",
      key: "MID",
    },

    {
      title: "DATE",
      dataIndex: "ASSESSMENTDATE",
      key: "ASSESSMENTDATE",
    },

    {
      title: "WEIGHT",
      dataIndex: "WEIGHT",
      key: "WEIGHT",
    },

    {
      title: "HEIGHT",
      dataIndex: "HEIGHT",
      key: "HEIGHT",
    },

    {
      title: "BMI",
      dataIndex: "BMI",
      key: "BMI",
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
    axios.delete(`/api/memberassessment/${record.MAID}`).then((res) => {
      console.log(res);
      setData(data.filter((member) => member.MAID !== record.MAID));
    });
  };

  const onUpdate = (record) => {
    navigate(`/dashboard/members/update-member-assessment/${record.MAID}`);
  };

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/api/memberassessment").then((res) => {
      setData(res.data.data);
    });
  }, []);

  const searchedData = useMemo(() => {
    return data.filter(
      (d) =>
        `${d.HEIGHT}`?.includes(search) ||
        `${d.MID}`?.includes(search) ||
        `${d.ASSESSMENTDATE}`?.includes(search)
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
