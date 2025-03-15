import { Button, Input, Typography } from "antd";
import classes from "./UpdateMembers.module.css";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

const { Title } = Typography;

export const UpdateMembers = () => {
  const params = useParams();
  console.log(params);
  const [member, setMember] = useState({
    fname: null,
    lname: "",
    email: null,
    phonenum: "",
    emergencynum: "",
    area: "",
    city: "",
    zipcode: "",
    h_no: "",
    street: "",
  });

  useEffect(() => {
    axios.get(`/api/members/${params.id}`).then((res) => {
      console.log(res.data.data);
      setMember(res.data.data);
    });
  }, []);

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

  const onUpdate = () => {
    axios.put(`/api/members/${params.id}`, member).then(() => {
      naviagate("/dashboard/members/view-members");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Update Members
      </Title>
      <div className={classes.container}>
        <div className={classes.lineAndGap}>
          <Input
            onChange={handleMemberChange("fname")}
            value={member.fname}
            placeholder="First Name"
          />
          <Input
            value={member.lname}
            onChange={handleMemberChange("lname")}
            placeholder="Last Name"
          />
        </div>
        <Input
          value={member.email}
          onChange={handleMemberChange("email")}
          placeholder="Email"
        />
        <Input
          value={member.phonenum}
          onChange={handleMemberChange("phonenum")}
          placeholder="Phone No"
        />
        <Input
          value={member.emergencynum}
          onChange={handleMemberChange("emergencynum")}
          placeholder="Emergency No"
        />
        <div className={classes.lineAndGap}>
          <Input
            value={member.h_no}
            onChange={handleMemberChange("h_no")}
            placeholder="House No"
          />
          <Input
            value={member.street}
            onChange={handleMemberChange("street")}
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
            value={member.zipcode}
            onChange={handleMemberChange("zipcode")}
            placeholder="Zip Code"
          />
        </div>

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
