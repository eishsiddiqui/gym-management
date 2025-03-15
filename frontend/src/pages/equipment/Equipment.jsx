import { Button, Typography } from "antd";
import classes from "./Equipment.module.css";
import { useNavigate } from "react-router";
import { ETypeTable } from "./ETypeTable";

const { Title } = Typography;

export const Equipment = () => {
  const navigate = useNavigate();

  const onAddEquipment = () => {
    navigate("/dashboard/equipment/add-equipment");
  };

  return (
    <div>
      <div className={classes.titleWrapper}>
        <Title className={classes.title} level={4}>
          Equipment Available
        </Title>
        <Button onClick={onAddEquipment} type="primary">
          Add Equipment
        </Button>
      </div>
      <ETypeTable />
    </div>
  );
};
