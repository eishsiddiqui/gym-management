import { Button, Input, Typography } from "antd";
import classes from "./AddSalary.module.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

const { Title } = Typography;

export const AddSalary = () => {
  const navigate = useNavigate();

  const [salary, setSalary] = useState({
    empID: "",
    date: new Date().toISOString().slice(0, 10),
    bonus: null,
    deductions: null,
    transactionID: "",
    bank: "",
  });

  const onBack = () => {
    navigate("/dashboard/employee/salary");
  };

  const handleSalaryChange = (key) => (e) => {
    setSalary({
      ...salary,
      [key]: e.target.value,
    });
  };

  const onSave = () => {
    axios.post("/api/salary", salary).then(() => {
      navigate("/dashboard/employee/salary");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Add Salary
      </Title>
      <div className={classes.container}>
        <Input
          value={salary.empID}
          onChange={handleSalaryChange("empID")}
          placeholder="Employee Number"
        />
        <Input
          value={salary.date}
          onChange={handleSalaryChange("date")}
          placeholder="Date YYYY-MM-DD"
        />

        <Input
          type="number"
          value={salary.bonus}
          onChange={handleSalaryChange("bonus")}
          placeholder="Bonus"
        />
        <Input
          type="number"
          value={salary.deductions}
          onChange={handleSalaryChange("deductions")}
          placeholder="Deductions"
        />
        <Input
          value={salary.transactionID}
          onChange={handleSalaryChange("transactionID")}
          placeholder="Transaction ID"
        />

        <Input
          value={salary.bank}
          onChange={handleSalaryChange("bank")}
          placeholder="Bank"
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
