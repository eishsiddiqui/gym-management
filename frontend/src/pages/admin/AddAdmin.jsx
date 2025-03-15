import { Button, Input, Typography } from "antd";
import classes from "./AddAdmin.module.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

const { Title } = Typography;

export const AddAdmin = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
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
    cnic: null,
    uname: null,
    passwd: null,
  });

  const onBack = () => {
    navigate("/dashboard/admin/view-admin");
  };

  const handleAdminChange = (key) => (e) => {
    setAdmin({
      ...admin,
      [key]: e.target.value,
    });
  };

  const onSave = () => {
    axios.post("/api/admin", admin).then(() => {
      navigate("/dashboard/admin");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Add New Admin
      </Title>
      <div className={classes.container}>
        <div className={classes.lineAndGap}>
          <Input
            value={admin.fName}
            onChange={handleAdminChange("fName")}
            placeholder="First Name"
          />
          <Input
            value={admin.lName}
            onChange={handleAdminChange("lName")}
            placeholder="Last Name"
          />
        </div>
        <Input
          value={admin.email}
          onChange={handleAdminChange("email")}
          placeholder="Email"
        />
        <Input
          value={admin.phoneNo}
          onChange={handleAdminChange("phoneNo")}
          placeholder="Phone No"
        />
        <Input
          value={admin.emergencyNo}
          onChange={handleAdminChange("emergencyNo")}
          placeholder="Emergency No"
        />

        <Input
          type="number"
          value={admin.salary}
          onChange={handleAdminChange("salary")}
          placeholder="Salary"
        />

        <div className={classes.lineAndGap}>
          <Input
            value={admin.houseNo}
            onChange={handleAdminChange("houseNo")}
            placeholder="House No"
          />
          <Input
            value={admin.streetNo}
            onChange={handleAdminChange("streetNo")}
            placeholder="Street No"
          />
        </div>
        <Input
          value={admin.area}
          onChange={handleAdminChange("area")}
          placeholder="Area"
        />
        <div className={classes.lineAndGap}>
          <Input
            value={admin.city}
            onChange={handleAdminChange("city")}
            placeholder="City"
          />
          <Input
            value={admin.zipCode}
            onChange={handleAdminChange("zipCode")}
            placeholder="Zip Code"
          />
        </div>
        <Input
          value={admin.cnic}
          onChange={handleAdminChange("cnic")}
          placeholder="CNIC"
        />

        <Input
          value={admin.uname}
          onChange={handleAdminChange("uname")}
          placeholder="UserName"
        />

        <Input
          type="password"
          value={admin.passwd}
          onChange={handleAdminChange("passwd")}
          placeholder="Password"
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
