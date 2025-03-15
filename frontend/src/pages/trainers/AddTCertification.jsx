import { Button, Input, Typography } from "antd";
import classes from "./AddTCertification.module.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

const { Title } = Typography;

export const AddTCertification = () => {
  const navigate = useNavigate();

  const [tcertifications, setTCertifications] = useState({
    trainerID: "",
    cID: "",
  });

  const onBack = () => {
    navigate("/dashboard/trainer/tcertifications");
  };

  const onAddCertification = () => {
    navigate("/dashboard/trainer/certifications");
  };

  const handleAddTCertificationChange = (key) => (e) => {
    setTCertifications({
      ...tcertifications,
      [key]: e.target.value,
    });
  };

  const onSave = () => {
    axios.post("/api/tcertifications", tcertifications).then(() => {
      navigate("/dashboard/trainer/tcertifications");
    });
  };

  return (
    <div>
      <div className={classes.buttonGroup}>
        <Title className={classes.title} level={4}>
          Add Trainer Certification
        </Title>
        <Button onClick={onAddCertification} type="primary">
          View Certification
        </Button>
      </div>

      <div className={classes.container}>
        <Input
          value={tcertifications.trainerID}
          onChange={handleAddTCertificationChange("trainerID")}
          placeholder="Trainer ID"
        />

        <Input
          value={tcertifications.cID}
          onChange={handleAddTCertificationChange("cID")}
          placeholder="Certification ID"
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
