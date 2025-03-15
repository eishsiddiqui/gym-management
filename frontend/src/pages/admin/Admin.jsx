import { Button, Typography } from "antd";
import classes from "./Admin.module.css";
import { useNavigate } from "react-router";
import { ATable } from "./ATable";

const { Title } = Typography;

export const Admin = () => {
  const navigate = useNavigate();

  const onAddAdmin = () => {
    navigate("/dashboard/admin/add-admin");
  };

  return (
    <div>
      <div className={classes.titleWrapper}>
        <Title className={classes.title} level={4}>
          Admin List
        </Title>
        <Button onClick={onAddAdmin} type="primary">
          Add New Admin
        </Button>
      </div>

      <ATable />
    </div>
  );
};
