import { Button, Input, Typography } from "antd";
import classes from "./AddMAssessment.module.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

const { Title } = Typography;

export const AddMAssessment = () => {
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState({
    memberId: "",
    date: new Date().toISOString().slice(0, 10),
    weight: "",
    height: "",
    bmi: null,
  });

  const onBack = () => {
    navigate("/dashboard/members/view-member-assessment");
  };

  const handleAssessmentChange = (key) => (e) => {
    setAssessment({
      ...assessment,
      [key]: e.target.value,
    });
  };

  const onSave = () => {
    axios.post("/api/memberassessment", assessment).then(() => {
      navigate("/dashboard/members/view-member-assessment");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Add Assessment
      </Title>
      <div className={classes.container}>
        <Input
          value={assessment.memberId}
          onChange={handleAssessmentChange("memberId")}
          placeholder="Member ID"
        />
        <Input
          value={assessment.date}
          onChange={handleAssessmentChange("date")}
          placeholder="Date YYYY-MM-DD"
        />

        <Input
          type="number"
          value={assessment.weight}
          onChange={handleAssessmentChange("weight")}
          placeholder="Weight"
        />
        <Input
          type="number"
          value={assessment.height}
          onChange={handleAssessmentChange("height")}
          placeholder="Height"
        />
        <Input
          type="number"
          value={assessment.bmi}
          onChange={handleAssessmentChange("bmi")}
          placeholder="BMI"
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
