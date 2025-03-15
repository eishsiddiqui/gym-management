import { Button, Input, Typography } from "antd";
import classes from "./AddMembership.module.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";

const { Title } = Typography;

export const AddMembership = () => {
  const navigate = useNavigate();

  const [membership, setMembership] = useState({
    memberId: "",
    date: new Date().toISOString().slice(0, 10),
    mstype: "",
    paymethod: "",
    transactionID: "",
    trainerID: null,
  });

  const onBack = () => {
    navigate("/dashboard/membership/view-membership");
  };

  const handleMembershipChange = (key) => (e) => {
    setMembership({
      ...membership,
      [key]: e.target.value,
    });
  };

  const onSave = () => {
    axios.post("/api/membership", membership).then(() => {
      navigate("/dashboard/membership/view-membership");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Add Membership
      </Title>
      <div className={classes.container}>
        <Input
          value={membership.memberId}
          onChange={handleMembershipChange("memberId")}
          placeholder="Member ID"
        />
        <Input
          value={membership.mstype}
          onChange={handleMembershipChange("mstype")}
          placeholder="Membership Type ID"
        />
        <Input
          value={membership.paymethod}
          onChange={handleMembershipChange("paymethod")}
          placeholder="Payment Method"
        />
        <Input
          value={membership.transactionID}
          onChange={handleMembershipChange("transactionID")}
          placeholder="Transaction ID"
        />
        <Input
          value={membership.trainerID}
          onChange={handleMembershipChange("trainerID")}
          placeholder="Trainer ID"
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
