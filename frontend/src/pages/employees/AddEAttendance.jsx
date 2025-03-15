import { useState } from "react";
import { Button, Input, Typography } from "antd";
import classes from "./AddEAttendance.module.css";
import { useNavigate } from "react-router";
import axios from "axios";

const { Title } = Typography;

export const AddEAttendance = () => {
  const navigate = useNavigate();

  const [empattendance, setEmpAttendance] = useState({
    empID: "",
    status: "",
  });

  const onBack = () => {
    navigate("/dashboard/employee/view-employees-attendance");
  };

  const handleEAttendanceChange = (key) => (e) => {
    setEmpAttendance({
      ...empattendance,
      [key]: e.target.value,
    });
  };

  const onSave = () => {
    axios.post("/api/eattendance", empattendance).then(() => {
      navigate("/dashboard/employee/view-employees-attendance");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Add Attendance
      </Title>
      <div className={classes.container}>
        <Input
          value={empattendance.empID}
          onChange={handleEAttendanceChange("empID")}
          placeholder="Employee ID"
        />
        <Input
          value={empattendance.status}
          onChange={handleEAttendanceChange("status")}
          placeholder="Status"
        />

        <div className={classes.buttonGroup}>
          <Button onClick={onBack} type="dashed">
            Back
          </Button>
          <Button onClick={onSave} type="primary">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
