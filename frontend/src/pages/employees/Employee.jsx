import { Button, Typography } from "antd";
import classes from "./Employee.module.css";
import { useNavigate } from "react-router";
import { EmployeeTable } from "./EmployeeTable";

const { Title } = Typography;

export const Employee = () => {
  const navigate = useNavigate();

  const onAddEmployee = () => {
    navigate("/dashboard/employee/add-employees");
  };

  return (
    <div>
      <div className={classes.titleWrapper}>
        <Title className={classes.title} level={4}>
          Employees
        </Title>
        <Button onClick={onAddEmployee} type="primary">
          Add Employee
        </Button>
      </div>
      <EmployeeTable />
    </div>
  );
};
