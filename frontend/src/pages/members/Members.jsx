import { Button, Typography } from "antd";
import classes from "./Members.module.css";
import { useNavigate } from "react-router";
import { MembersTable } from "./MembersTable";

const { Title } = Typography;

export const Members = () => {
  const navigate = useNavigate();

  const onAddMembers = () => {
    navigate("/dashboard/members/add-members");
  };

  return (
    <div>
      <div className={classes.titleWrapper}>
        <Title className={classes.title} level={4}>
          Members
        </Title>
        <Button onClick={onAddMembers} type="primary">
          Add Member
        </Button>
      </div>
      <MembersTable />
    </div>
  );
};
