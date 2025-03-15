import { Button, Typography } from "antd";
import classes from "./Salary.module.css";
import { useNavigate } from "react-router";
import { SalaryTable } from "./SalaryTable";

const { Title } = Typography;

export const Salary = () => {
  const navigate = useNavigate();

  const onAddSalary = () => {
    navigate("/dashboard/employee/add-salary");
  };

  return (
    <div>
      <div className={classes.titleWrapper}>
        <Title className={classes.title} level={4}>
          Salaries
        </Title>
        <Button onClick={onAddSalary} type="primary">
          Add Salary
        </Button>
      </div>
      <SalaryTable />
    </div>
  );
};
