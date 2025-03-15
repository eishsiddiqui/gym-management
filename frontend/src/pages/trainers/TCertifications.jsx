import { Button, Typography } from "antd";
import classes from "./TCertifications.module.css";
import { useNavigate } from "react-router";
import { CertificationsTable } from "./TCertificationsTable";

const { Title } = Typography;

export const TCertifications = () => {
  const navigate = useNavigate();

  const onAddTCertification = () => {
    navigate("/dashboard/trainer/add-tcertification");
  };

  return (
    <div>
      <div className={classes.titleWrapper}>
        <Title className={classes.title} level={4}>
        Trainers' Certifications
        </Title>
        <Button onClick={onAddTCertification} type="primary">
          Add Trainer Certification
        </Button>
      </div>
      <CertificationsTable />
    </div>
  );
};
