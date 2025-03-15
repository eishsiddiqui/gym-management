import { Button, Typography } from "antd";
import classes from "./MemberAssessment.module.css";
import { useNavigate } from "react-router";
import { MAssessmentTable } from "./MAssessmentTable";

const { Title } = Typography;

export const MemberAssessment = () => {
  const navigate = useNavigate();

  const onAddAssessment = () => {
    navigate("/dashboard/members/add-member-assessment");
  };

  return (
    <div>
      <div className={classes.titleWrapper}>
        <Title className={classes.title} level={4}>
          Members' Assessment
        </Title>
        <Button onClick={onAddAssessment} type="primary">
          Add Assessment
        </Button>
      </div>
      <MAssessmentTable />
    </div>
  );
};
