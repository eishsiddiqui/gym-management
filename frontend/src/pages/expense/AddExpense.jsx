import { Button, Input, Typography } from "antd";
import classes from "./AddExpense.module.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";

const { Title } = Typography;

export const AddExpense = () => {
  const navigate = useNavigate();

  const [expense, setExpense] = useState({
    type: "",
    date: new Date().toISOString().slice(0, 10),
    price: null,
    adminID: "",
  });

  const onBack = () => {
    navigate("/dashboard/expense/view-expense");
  };

  const handleExpenseChange = (key) => (e) => {
    setExpense({
      ...expense,
      [key]: e.target.value,
    });
  };

  const onSave = () => {
    axios.post("/api/expense", expense).then(() => {
      navigate("/dashboard/expense/view-expense");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Add Expense
      </Title>
      <div className={classes.container}>
        <Input
          value={expense.type}
          onChange={handleExpenseChange("type")}
          placeholder="Expense Type"
        />

        <Input
          value={expense.date}
          onChange={handleExpenseChange("date")}
          placeholder="Date YYYY-MM-DD"
        />

        <Input
          type="number"
          value={expense.price}
          onChange={handleExpenseChange("price")}
          placeholder="Amount"
        />

        <Input
          value={expense.adminID}
          onChange={handleExpenseChange("adminID")}
          placeholder="Admin ID"
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
