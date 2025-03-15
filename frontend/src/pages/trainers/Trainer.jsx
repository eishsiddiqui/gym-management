import { Button, Typography } from "antd";
import classes from "./Trainer.module.css";
import { useNavigate } from "react-router";
import { TrainerTable } from "./TrainerTable";

const { Title } = Typography;

export const Trainer = () => {
  const navigate = useNavigate();

  const onAddTrainer = () => {
    navigate("/dashboard/trainer/add-trainer");
  };

  return (
    <div>
      <div className={classes.titleWrapper}>
        <Title className={classes.title} level={4}>
          Trainers
        </Title>
        <Button onClick={onAddTrainer} type="primary">
          Add Trainer
        </Button>
      </div>
      <TrainerTable />
    </div>
  );
};
