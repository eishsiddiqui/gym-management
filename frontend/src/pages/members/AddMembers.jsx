import { Button, Input, Typography } from "antd";
import classes from "./AddMembers.module.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

const { Title } = Typography;

export const AddMembers = () => {
  const [member, setMember] = useState({
    fName: null,
    lName: "",
    email: null,
    phoneNo: "",
    emergencyNo: "",
    houseNo: "",
    streetNo: "",
    area: "",
    city: "",
    zipCode: "",
  });

  const handleMemberChange = (key) => (e) => {
    setMember({
      ...member,
      [key]: e.target.value,
    });
  };

  const naviagate = useNavigate();

  const onBack = () => {
    naviagate("/dashboard/members/view-members");
  };

  const onSave = () => {
    axios.post("/api/members", member).then(() => {
      naviagate("/dashboard/members/view-members");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Add Members
      </Title>
      <div className={classes.container}>
        <div className={classes.lineAndGap}>
          <Input
            onChange={handleMemberChange("fName")}
            value={member.fName}
            placeholder="First Name"
          />
          <Input
            onChange={handleMemberChange("lName")}
            value={member.lName}
            placeholder="Last Name"
          />
        </div>
        <Input
          value={member.email}
          onChange={handleMemberChange("email")}
          placeholder="Email"
        />
        <Input
          value={member.phoneNo}
          onChange={handleMemberChange("phoneNo")}
          placeholder="Phone No"
        />
        <Input
          value={member.emergencyNo}
          onChange={handleMemberChange("emergencyNo")}
          placeholder="Emergency No"
        />
        <div className={classes.lineAndGap}>
          <Input
            value={member.houseNo}
            onChange={handleMemberChange("houseNo")}
            placeholder="House No"
          />
          <Input
            value={member.streetNo}
            onChange={handleMemberChange("streetNo")}
            placeholder="Street No"
          />
        </div>
        <Input
          value={member.area}
          onChange={handleMemberChange("area")}
          placeholder="Area"
        />
        <div className={classes.lineAndGap}>
          <Input
            onChange={handleMemberChange("city")}
            value={member.city}
            placeholder="City"
          />
          <Input
            onChange={handleMemberChange("zipCode")}
            value={member.zipCode}
            placeholder="Zip Code"
          />
        </div>

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
