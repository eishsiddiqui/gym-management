import { Button, Input, Typography } from "antd";
import classes from "./UpdateMAssessment.module.css";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

const { Title } = Typography;

export const UpdateMAssessment = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [assessment, setAssessment] = useState({
    MID: "",
    ASSESSMENTDATE: "",
    WEIGHT: "",
    HEIGHT: "",
    BMI: null,
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

  useEffect(() => {
    axios.get(`/api/memberassessment/${params.id}`).then((res) => {
      console.log(res.data.data);
      setAssessment(res.data.data);
    });
  }, []);

  const onUpdate = () => {
    axios.put(`/api/memberassessment/${params.id}`, assessment).then(() => {
      navigate("/dashboard/members/view-member-assessment");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Update Assessment
      </Title>
      <div className={classes.container}>
        <Input
          value={assessment.MID}
          onChange={handleAssessmentChange("MID")}
          placeholder="Member ID"
        />
        <Input
          value={assessment.ASSESSMENTDATE}
          onChange={handleAssessmentChange("ASSESSMENTDATE")}
          placeholder="Date YYYY-MM-DD"
        />

        <Input
          type="number"
          value={assessment.WEIGHT}
          onChange={handleAssessmentChange("WEIGHT")}
          placeholder="Weight"
        />
        <Input
          type="number"
          value={assessment.HEIGHT}
          onChange={handleAssessmentChange("HEIGHT")}
          placeholder="Height"
        />
        <Input
          type="number"
          value={assessment.BMI}
          onChange={handleAssessmentChange("BMI")}
          placeholder="BMI"
        />

        <div className={classes.buttonGroup}>
          <Button onClick={onBack} type="dashed">
            Back
          </Button>
          <Button onClick={onUpdate} type="primary">
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};
