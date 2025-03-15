import { Button, Typography } from "antd";
import classes from "./MemberAttendance.module.css";
import { useNavigate } from "react-router";
import { MAttendanceTable } from "./MAttendanceTable";

const { Title } = Typography;

export const MemberAttendance = () => {
  const navigate = useNavigate();

  const onAddAttendance = () => {
    navigate("/dashboard/members/add-member-attendance");
  };

  return (
    <div>
      <div className={classes.titleWrapper}>
        <Title className={classes.title} level={4}>
          Attendance
        </Title>
        <Button onClick={onAddAttendance} type="primary">
          Add Attendance
        </Button>
      </div>
      <MAttendanceTable />
    </div>
  );
};
