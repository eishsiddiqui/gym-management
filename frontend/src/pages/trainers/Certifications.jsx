import { Button, Typography } from "antd";
import classes from "./Certifications.module.css";
import { useNavigate } from "react-router";
import { CertificationsTable } from "./CertificationsTable";

const { Title } = Typography;

export const Certifications = () => {
  const navigate = useNavigate();

  const onAddCertification = () => {
    navigate("/dashboard/trainer/add-certification");
  };

  return (
    <div>
      <div className={classes.titleWrapper}>
        <Title className={classes.title} level={4}>
        Certifications
        </Title>
        <Button onClick={onAddCertification} type="primary">
          Add New Certification
        </Button>
      </div>
      <CertificationsTable />
    </div>
  );
};
