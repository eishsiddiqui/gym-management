import { Button, Input, Typography } from "antd";
import classes from "./AddEquipment.module.css";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

const { Title } = Typography;

export const UpdateEquipment = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [equipment, setEquipment] = useState({
    eqname: null,
    category: "",
    purchasedate: "",
    status: "",
    price: null,
    empno: "",
  });

  const onBack = () => {
    navigate("/dashboard/equipment/view-equipment");
  };

  const handleEquipmentChange = (key) => (e) => {
    setEquipment({
      ...equipment,
      [key]: e.target.value,
    });
  };

  useEffect(() => {
    axios.get(`/api/equipment/${params.id}`).then((res) => {
      console.log(res.data.data);
      setEquipment(res.data.data);
    });
  }, []);

  const onUpdate = () => {
    axios.put(`/api/equipment/${params.id}`, equipment).then(() => {
      navigate("/dashboard/equipment");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Update Equipment
      </Title>
      <div className={classes.container}>
        <Input
          value={equipment.eqname}
          onChange={handleEquipmentChange("eqname")}
          placeholder="Equipment Name"
        />
        <Input
          value={equipment.category}
          onChange={handleEquipmentChange("category")}
          placeholder="Category"
        />
        <Input
          value={equipment.purchasedate}
          onChange={handleEquipmentChange("purchasedate")}
          placeholder="Date YYYY-MM-DD"
        />
        <Input
          value={equipment.status}
          onChange={handleEquipmentChange("status")}
          placeholder="Status"
        />
        <Input
          type="number"
          value={equipment.price}
          onChange={handleEquipmentChange("price")}
          placeholder="Price"
        />
        <Input
          value={equipment.empno}
          onChange={handleEquipmentChange("empno")}
          placeholder="Admin ID"
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
