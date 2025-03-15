import { Button, Input, Typography } from "antd";
import classes from "./AddMembershipType.module.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

const { Title } = Typography;

export const AddMembershipType = () => {
  const navigate = useNavigate();

  const [membershiptype, setMembershipType] = useState({
    mtname: "",
    duration: null,
    price: null,
    tlevel: "",
  });

  const onBack = () => {
    navigate("/dashboard/membershiptype/view-membershiptype");
  };

  const handleMembershipTypeChange = (key) => (e) => {
    setMembershipType({
      ...membershiptype,
      [key]: e.target.value,
    });
  };

  const onSave = () => {
    axios.post("/api/membershiptype", membershiptype).then(() => {
      navigate("/dashboard/membershiptype/view-membershiptype");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Add Membership Type
      </Title>

      <div className={classes.container}>
        <Input
          value={membershiptype.mtname}
          onChange={handleMembershipTypeChange("mtname")}
          placeholder="Name"
        />
        <Input
          type="number"
          value={membershiptype.duration}
          onChange={handleMembershipTypeChange("duration")}
          placeholder="Duration"
        />
        <Input
          type="number"
          value={membershiptype.price}
          onChange={handleMembershipTypeChange("price")}
          placeholder="Price"
        />
        <Input
          value={membershiptype.tlevel}
          onChange={handleMembershipTypeChange("tlevel")}
          placeholder="Trainer Level"
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
