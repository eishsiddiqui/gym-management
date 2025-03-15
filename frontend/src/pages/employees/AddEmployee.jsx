import { Button, Input, Typography, message } from "antd";
import classes from "./AddEmployee.module.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

const { Title } = Typography;

export const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    fName: null,
    lName: "",
    email: null,
    phoneNo: "",
    emergencyNo: "",
    salary: null,
    job: "",
    houseNo: "",
    streetNo: "",
    area: "",
    city: "",
    zipCode: "",
    cnic: null,
  });

  const handleEmployeeChange = (key) => (e) => {
    setEmployee({
      ...employee,
      [key]: e.target.value,
    });
  };

  const naviagate = useNavigate();

  const onBack = () => {
    naviagate("/dashboard/employee/view-employees");
  };

  const onSave = () => {
    axios.post("/api/employee", employee).then(() => {
      naviagate("/dashboard/employee/view-employees");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Add Employee
      </Title>

      <div className={classes.container}>
        <div className={classes.lineAndGap}>
          <Input
            value={employee.fName}
            onChange={handleEmployeeChange("fName")}
            placeholder="First Name"
          />
          <Input
            value={employee.lName}
            onChange={handleEmployeeChange("lName")}
            placeholder="Last Name"
          />
        </div>
        <Input
          value={employee.email}
          onChange={handleEmployeeChange("email")}
          placeholder="Email"
        />
        <Input
          value={employee.phoneNo}
          onChange={handleEmployeeChange("phoneNo")}
          placeholder="Phone No"
        />
        <Input
          value={employee.emergencyNo}
          onChange={handleEmployeeChange("emergencyNo")}
          placeholder="Emergency No"
        />
        <div className={classes.lineAndGap}>
          <Input
            type="number"
            value={employee.salary}
            onChange={handleEmployeeChange("salary")}
            placeholder="Salary"
          />
          <Input
            value={employee.job}
            onChange={handleEmployeeChange("job")}
            placeholder="Job"
          />
        </div>
        <div className={classes.lineAndGap}>
          <Input
            value={employee.houseNo}
            onChange={handleEmployeeChange("houseNo")}
            placeholder="House No"
          />
          <Input
            value={employee.streetNo}
            onChange={handleEmployeeChange("streetNo")}
            placeholder="Street No"
          />
        </div>
        <Input
          value={employee.area}
          onChange={handleEmployeeChange("area")}
          placeholder="Area"
        />
        <div className={classes.lineAndGap}>
          <Input
            value={employee.city}
            onChange={handleEmployeeChange("city")}
            placeholder="City"
          />
          <Input
            value={employee.zipCode}
            onChange={handleEmployeeChange("zipCode")}
            placeholder="Zip Code"
          />
        </div>
        <Input
          value={employee.cnic}
          onChange={handleEmployeeChange("cnic")}
          placeholder="Cnic"
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
