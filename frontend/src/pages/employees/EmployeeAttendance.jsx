import { Button, Typography } from "antd";
import classes from "./EmployeeAttendance.module.css";
import { useNavigate } from "react-router";
import { EAttendanceTable } from "./EAttendanceTable";

const { Title } = Typography;

export const EmployeeAttendance = () => {
  const navigate = useNavigate();

  const onAddAttendance = () => {
    navigate("/dashboard/employee/add-employees-attendance");
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
      <EAttendanceTable />
    </div>
  );
};
