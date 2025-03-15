import { Button, Input, Typography } from "antd";
import classes from "./AddEquipment.module.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

const { Title } = Typography;

export const AddEquipment = () => {
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState({
    name: null,
    category: "",
    date: new Date().toISOString().slice(0, 10),
    status: "",
    price: null,
    adminID: "",
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

  const onSave = () => {
    axios.post("/api/equipment", equipment).then(() => {
      navigate("/dashboard/equipment");
    });
  };

  return (
    <div>
      <Title className={classes.title} level={4}>
        Add Equipment
      </Title>
      <div className={classes.container}>
        <Input
          value={equipment.name}
          onChange={handleEquipmentChange("name")}
          placeholder="Equipment Name"
        />
        <Input
          value={equipment.category}
          onChange={handleEquipmentChange("category")}
          placeholder="Category"
        />
        <Input
          value={equipment.date}
          onChange={handleEquipmentChange("date")}
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
          value={equipment.adminID}
          onChange={handleEquipmentChange("adminID")}
          placeholder="Admin ID"
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
