import { Button, Typography } from "antd";
import classes from "./Expense.module.css";
import { useNavigate } from "react-router";
import { ExpenseTable } from "./ExpenseTable";

const { Title } = Typography;

export const Expense = () => {
  const navigate = useNavigate();

  const onAddExpense = () => {
    navigate("/dashboard/expense/add-expense");
  };

  return (
    <div>
      <div className={classes.titleWrapper}>
        <Title className={classes.title} level={4}>
          Expense
        </Title>
        <Button onClick={onAddExpense} type="primary">
          Add Expense
        </Button>
      </div>
      <ExpenseTable />
    </div>
  );
};
