import { Button, Input, Typography } from "antd";
import classes from "./UpdateTrainer.module.css";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

const { Title } = Typography;

export const UpdateTrainer = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [trainer, setTrainer] = useState({
    H_NO: "",
    STREET: "",
    AREA: "",
    CITY: "",
    ZIPCODE: "",
    FNAME: null,
    LNAME: "",
    EMAIL: null,
    PHONENUM: "",
    EMERGENCYNUM: "",
    SALARY: null,
    CNIC: "",
    SID: null,
    mtID: null,
    SKILLS: "",
    ENDDATE: null,
  });

  useEffect(() => {
    axios.get(`/api/trainer/${params.id}`).then((res) => {
      console.log(res.data.data);
      setTrainer(res.data.data);
    });
  }, []);

  const handleTrainerChange = (key) => (e) => {
    setTrainer({
      ...trainer,
      [key]: e.target.value,
    });
  };

  const onBack = () => {
    navigate("/dashboard/trainer/view-trainers");
  };

  const onUpdate = () => {
    axios.put(`/api/trainer/${params.id}`, trainer).then(() => {
      navigate("/dashboard/trainer/view-trainers");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Update Trainer
      </Title>
      <div className={classes.container}>
        <div className={classes.lineAndGap}>
          <Input
            value={trainer.FNAME}
            onChange={handleTrainerChange("FNAME")}
            placeholder="First Name"
          />
          <Input
            value={trainer.LNAME}
            onChange={handleTrainerChange("LNAME")}
            placeholder="Last Name"
          />
        </div>
        <Input
          value={trainer.EMAIL}
          onChange={handleTrainerChange("EMAIL")}
          placeholder="Email"
        />
        <Input
          value={trainer.PHONENUM}
          onChange={handleTrainerChange("PHONENUM")}
          placeholder="Phone No"
        />
        <Input
          value={trainer.EMERGENCYNUM}
          onChange={handleTrainerChange("EMERGENCYNUM")}
          placeholder="Emergency No"
        />
        <div className={classes.lineAndGap}>
          <Input
            type="number"
            value={trainer.SALARY}
            onChange={handleTrainerChange("SALARY")}
            placeholder="Salary"
          />
          <Input
            value={trainer.SID}
            onChange={handleTrainerChange("SID")}
            placeholder="Shift ID"
          />
        </div>
        <div className={classes.lineAndGap}>
          <Input
            value={trainer.H_NO}
            onChange={handleTrainerChange("H_NO")}
            placeholder="House No"
          />
          <Input
            value={trainer.STREET}
            onChange={handleTrainerChange("STREET")}
            placeholder="Street No"
          />
        </div>
        <Input
          value={trainer.AREA}
          onChange={handleTrainerChange("AREA")}
          placeholder="Area"
        />
        <div className={classes.lineAndGap}>
          <Input
            value={trainer.CITY}
            onChange={handleTrainerChange("CITY")}
            placeholder="City"
          />
          <Input
            value={trainer.ZIPCODE}
            onChange={handleTrainerChange("ZIPCODE")}
            placeholder="Zip Code"
          />
        </div>
        <Input
          value={trainer.CNIC}
          onChange={handleTrainerChange("CNIC")}
          placeholder="CNIC"
        />

        <Input
          value={trainer.mtID}
          onChange={handleTrainerChange("mtID")}
          placeholder="Membershiptype ID"
        />

        <Input
          value={trainer.SKILLS}
          onChange={handleTrainerChange("SKILLS")}
          placeholder="Skills"
        />

        <Input
          value={trainer.ENDDATE}
          onChange={handleTrainerChange("ENDDATE")}
          placeholder="End Date YYYY-MM-DD"
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
