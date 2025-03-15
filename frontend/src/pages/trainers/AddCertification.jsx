import { Button, Input, Typography, Space, DatePicker } from "antd";
import classes from "./AddCertification.module.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

const { Title } = Typography;

export const AddCertification = () => {
  const navigate = useNavigate();

  const [certification, setCertification] = useState({
    cName: null,

    issuer: "",
    issuedate: "",
  });

  const onBack = () => {
    navigate("/dashboard/trainer/certifications");
  };

  const handleAddCertificationChange = (key) => (e) => {
    setCertification({
      ...certification,
      [key]: e.target.value,
    });
  };

  const onSave = () => {
    axios.post("/api/certifications", certification).then(() => {
      navigate("/dashboard/trainer/certifications");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Add Certification
      </Title>
      <div className={classes.container}>
        <Input
          value={certification.cName}
          onChange={handleAddCertificationChange("cName")}
          placeholder="Certification Name"
        />

        <Input
          value={certification.issuer}
          onChange={handleAddCertificationChange("issuer")}
          placeholder="Issuer"
        />

        <Input
          value={certification.issuedate}
          onChange={handleAddCertificationChange("issuedate")}
          placeholder="Issue Date YYYY-MM-DD"
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
