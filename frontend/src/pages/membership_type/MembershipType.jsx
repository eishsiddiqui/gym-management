import { Button, Typography } from "antd";
import classes from "./MembershipType.module.css";
import { useNavigate } from "react-router";
import { MTypeTable } from "./MTypeTable";

const { Title } = Typography;

export const MembershipType = () => {
  const navigate = useNavigate();

  const onAddMembershipType = () => {
    navigate("/dashboard/membershiptype/add-membershiptype");
  };

  return (
    <div>
      <div className={classes.titleWrapper}>
        <Title className={classes.title} level={4}>
          Memberships Available
        </Title>
        <Button onClick={onAddMembershipType} type="primary">
          Add
        </Button>
      </div>
      <MTypeTable />
    </div>
  );
};
