import { Button, Input, Typography } from "antd";
import classes from "./AddTrainer.module.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

const { Title } = Typography;

export const AddTrainer = () => {
  const navigate = useNavigate();

  const [trainer, setTrainer] = useState({
    fName: null,
    lName: "",
    email: null,
    phoneNo: "",
    emergencyNo: "",
    salary: null,
    houseNo: "",
    streetNo: "",
    area: "",
    city: "",
    zipCode: "",
    cnic: "",
    shift: null,
    skills: "",
    mtID: null,
  });

  const handleTrainerChange = (key) => (e) => {
    setTrainer({
      ...trainer,
      [key]: e.target.value,
    });
  };

  const onBack = () => {
    navigate("/dashboard/trainer/view-trainers");
  };

  const onSave = () => {
    axios.post("/api/trainer", trainer).then(() => {
      navigate("/dashboard/trainer/view-trainers");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Add Trainer
      </Title>
      <div className={classes.container}>
        <div className={classes.lineAndGap}>
          <Input
            value={trainer.fName}
            onChange={handleTrainerChange("fName")}
            placeholder="First Name"
          />
          <Input
            value={trainer.lName}
            onChange={handleTrainerChange("lName")}
            placeholder="Last Name"
          />
        </div>
        <Input
          value={trainer.email}
          onChange={handleTrainerChange("email")}
          placeholder="Email"
        />
        <Input
          value={trainer.phoneNo}
          onChange={handleTrainerChange("phoneNo")}
          placeholder="Phone No"
        />
        <Input
          value={trainer.emergencyNo}
          onChange={handleTrainerChange("emergencyNo")}
          placeholder="Emergency No"
        />
        <div className={classes.lineAndGap}>
          <Input
            type="number"
            value={trainer.salary}
            onChange={handleTrainerChange("salary")}
            placeholder="Salary"
          />
          <Input
            value={trainer.shift}
            onChange={handleTrainerChange("shift")}
            placeholder="Shift ID"
          />
        </div>
        <div className={classes.lineAndGap}>
          <Input
            value={trainer.houseNo}
            onChange={handleTrainerChange("houseNo")}
            placeholder="House No"
          />
          <Input
            value={trainer.streetNo}
            onChange={handleTrainerChange("streetNo")}
            placeholder="Street No"
          />
        </div>
        <Input
          value={trainer.area}
          onChange={handleTrainerChange("area")}
          placeholder="Area"
        />
        <div className={classes.lineAndGap}>
          <Input
            value={trainer.city}
            onChange={handleTrainerChange("city")}
            placeholder="City"
          />
          <Input
            value={trainer.zipCode}
            onChange={handleTrainerChange("zipCode")}
            placeholder="Zip Code"
          />
        </div>
        <Input
          value={trainer.cnic}
          onChange={handleTrainerChange("cnic")}
          placeholder="CNIC"
        />

        <Input
          value={trainer.mtID}
          onChange={handleTrainerChange("mtID")}
          placeholder="Membershiptype ID"
        />

        <Input
          value={trainer.skills}
          onChange={handleTrainerChange("skills")}
          placeholder="Skills"
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
