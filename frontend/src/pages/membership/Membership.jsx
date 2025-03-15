import { Button, Typography } from "antd";
import classes from "./Membership.module.css";
import { useNavigate } from "react-router";
import { MSTypeTable } from "./MSTypeTable";

const { Title } = Typography;

export const Membership = () => {
  const navigate = useNavigate();

  const onAddMembership = () => {
    navigate("/dashboard/membership/add-membership");
  };

  return (
    <div className={classes.container}>
      <div className={classes.titleWrapper}>
        <Title className={classes.title} level={4}>
          Memberships
        </Title>
        <Button onClick={onAddMembership} type="primary">
          Add Membership
        </Button>
      </div>

      <div className={classes.content}>
        <MSTypeTable />
      </div>
    </div>
  );
};
