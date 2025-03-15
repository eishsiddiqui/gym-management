import { useState } from "react";
import { Button, Input, Typography } from "antd";
import classes from "./AddMAttendance.module.css";
import { useNavigate } from "react-router";
import axios from "axios";

const { Title } = Typography;

export const AddMAttendance = () => {
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState({
    memberId: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const onBack = () => {
    navigate("/dashboard/members/view-member-attendance");
  };

  const handleAttendanceChange = (key) => (e) => {
    setAttendance({
      ...attendance,
      [key]: e.target.value,
    });
  };

  const onSave = () => {
    axios.post("/api/mattendance", attendance).then(() => {
      navigate("/dashboard/members/view-member-attendance");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Add Attendance
      </Title>
      <div className={classes.container}>
        <Input
          value={attendance.memberId}
          onChange={handleAttendanceChange("memberId")}
          placeholder="Member ID"
        />
        <Input
          value={attendance.date}
          onChange={handleAttendanceChange("date")}
          placeholder="Date YYYY-MM-DD"
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
