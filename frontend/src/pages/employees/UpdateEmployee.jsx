import { Button, Input, Typography } from "antd";
import classes from "./UpdateEmployee.module.css";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

const { Title } = Typography;

export const UpdateEmployee = () => {
  const params = useParams();

  const [employee, setEmployee] = useState({
    fName: "",
    lName: "",
    email: "",
    phonenum: "",
    emergencynum: "",
    salary: "",
    job: "",
    h_no: "",
    street: "",
    area: "",
    city: "",
    zipcode: "",
    cnic: "",
    enddate: "",
  });

  useEffect(() => {
    axios.get(`/api/employee/${params.id}`).then((res) => {
      console.log(res.data.data);
      setEmployee(res.data.data);
    });
  }, []);

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

  const onUpdate = () => {
    axios.put(`/api/employee/${params.id}`, employee).then(() => {
      naviagate("/dashboard/employee/view-employees");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Update Employee
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
          value={employee.phonenum}
          onChange={handleEmployeeChange("phonenum")}
          placeholder="Phone No"
        />
        <Input
          value={employee.emergencynum}
          onChange={handleEmployeeChange("emergencynum")}
          placeholder="Emergency No"
        />
        <div className={classes.lineAndGap}>
          <Input
            type="number"
            value={employee.salary}
            onChange={handleEmployeeChange("salary")}
            placeholder="Salary"
          />
        </div>
        <div className={classes.lineAndGap}>
          <Input
            value={employee.h_no}
            onChange={handleEmployeeChange("h_no")}
            placeholder="House No"
          />
          <Input
            value={employee.street}
            onChange={handleEmployeeChange("street")}
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
            value={employee.zipcode}
            onChange={handleEmployeeChange("zipcode")}
            placeholder="Zip Code"
          />
        </div>
        <Input
          value={employee.cnic}
          onChange={handleEmployeeChange("cnic")}
          placeholder="Cnic"
        />

        <Input
          value={employee.enddate}
          onChange={handleEmployeeChange("enddate")}
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
