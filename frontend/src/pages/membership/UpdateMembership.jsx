import { Button, Input, Typography } from "antd";
import classes from "./UpdateMembership.module.css";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";

const { Title } = Typography;

export const UpdateMembership = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [membership, setMembership] = useState({
    MID: "",
    mtID: "",
    paymentMethod: "",
    transactionID: "",
    tID: null,
  });

  useEffect(() => {
    axios.get(`/api/membership/${params.id}`).then((res) => {
      console.log(res.data.data);
      setMembership(res.data.data);
    });
  }, []);

  const onBack = () => {
    navigate("/dashboard/membership/view-membership");
  };

  const handleMembershipChange = (key) => (e) => {
    setMembership({
      ...membership,
      [key]: e.target.value,
    });
  };

  const onUpdate = () => {
    axios.put(`/api/membership/${params.id}`, membership).then(() => {
      navigate("/dashboard/membership/view-membership");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Update Membership
      </Title>
      <div className={classes.container}>
        <Input
          value={membership.MID}
          onChange={handleMembershipChange("MID")}
          placeholder="Member ID"
        />
        <Input
          value={membership.mtID}
          onChange={handleMembershipChange("mtID")}
          placeholder="Membership Type ID"
        />
        <Input
          value={membership.paymentMethod}
          onChange={handleMembershipChange("paymentMethod")}
          placeholder="Payment Method"
        />
        <Input
          value={membership.transactionID}
          onChange={handleMembershipChange("transactionID")}
          placeholder="Transaction ID"
        />
        <Input
          value={membership.tID}
          onChange={handleMembershipChange("tID")}
          placeholder="Trainer ID"
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
