import { Button, Input, Typography } from "antd";
import classes from "./UpdateAdmin.module.css";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

const { Title } = Typography;

export const UpdateAdmin = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [admin, setAdmin] = useState({
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
    CNIC: null,
    USERNAME: null,
    PASSWORD: null,
    ENDDATE: "",
  });

  const onBack = () => {
    navigate("/dashboard/admin/view-admin");
  };

  useEffect(() => {
    axios.get(`/api/admin/${params.id}`).then((res) => {
      console.log(res.data.data);
      setAdmin(res.data.data);
    });
  }, []);

  const handleAdminChange = (key) => (e) => {
    setAdmin({
      ...admin,
      [key]: e.target.value,
    });
  };

  const onUpdate = () => {
    axios.put(`/api/admin/${params.id}`, admin).then(() => {
      navigate("/dashboard/admin");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Update Admin
      </Title>
      <div className={classes.container}>
        <div className={classes.lineAndGap}>
          <Input
            value={admin.FNAME}
            onChange={handleAdminChange("FNAME")}
            placeholder="First Name"
          />
          <Input
            value={admin.LNAME}
            onChange={handleAdminChange("LNAME")}
            placeholder="Last Name"
          />
        </div>
        <Input
          value={admin.EMAIL}
          onChange={handleAdminChange("EMAIL")}
          placeholder="Email"
        />
        <Input
          value={admin.PHONENUM}
          onChange={handleAdminChange("PHONENUM")}
          placeholder="Phone No"
        />
        <Input
          value={admin.EMERGENCYNUM}
          onChange={handleAdminChange("EMERGENCYNUM")}
          placeholder="Emergency No"
        />

        <Input
          type="number"
          value={admin.SALARY}
          onChange={handleAdminChange("SALARY")}
          placeholder="Salary"
        />

        <div className={classes.lineAndGap}>
          <Input
            value={admin.H_NO}
            onChange={handleAdminChange("H_NO")}
            placeholder="House No"
          />
          <Input
            value={admin.STREET}
            onChange={handleAdminChange("STREET")}
            placeholder="Street No"
          />
        </div>
        <Input
          value={admin.AREA}
          onChange={handleAdminChange("AREA")}
          placeholder="Area"
        />
        <div className={classes.lineAndGap}>
          <Input
            value={admin.CITY}
            onChange={handleAdminChange("CITY")}
            placeholder="City"
          />
          <Input
            value={admin.ZIPCODE}
            onChange={handleAdminChange("ZIPCODE")}
            placeholder="Zip Code"
          />
        </div>
        <Input
          value={admin.CNIC}
          onChange={handleAdminChange("CNIC")}
          placeholder="CNIC"
        />

        <Input
          value={admin.USERNAME}
          onChange={handleAdminChange("USERNAME")}
          placeholder="UserName"
        />

        <Input
          type="password"
          value={admin.PASSWORD}
          onChange={handleAdminChange("PASSWORD")}
          placeholder="Password"
        />

        <Input
          value={admin.ENDDATE}
          onChange={handleAdminChange("ENDDATE")}
          placeholder="END DATE YYYY-MM-DD"
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
