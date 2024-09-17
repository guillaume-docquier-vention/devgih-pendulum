import { FC } from "react";
import { PendulumConst } from "../constants/pendulum.const";
import { Pendulum } from "../models/pendulum";
import "./PendulumForm.scss";

interface PendulumFormProps {
  pendulum: Pendulum;
  disabled?: boolean;
  onChange: (pendulum: Pendulum) => void;
}

export const PendulumForm: FC<PendulumFormProps> = ({
  pendulum,
  onChange,
  disabled,
}) => {
  //TODO: add real form validation
  return (
    <form
      className="pendulum-card-container"
      style={{ borderLeft: `solid 8px ${pendulum.color}` }}
    >
      <h2>Pendule {pendulum.id}</h2>
      <label>
        <span>Longueur (m)</span>
        <input
          disabled={disabled}
          type="number"
          value={pendulum.length}
          onChange={(e) =>
            onChange({ ...pendulum, length: parseFloat(e.target.value) })
          }
          min={PendulumConst.MIN_LENGTH}
          max={PendulumConst.MAX_LENGTH}
          step={PendulumConst.LENGTH_STEP}
        />
      </label>
      <label>
        <span>Angle Initial (rad)</span>
        <input
          disabled={disabled}
          type="number"
          value={pendulum.initialAngle ?? 0}
          onChange={(e) =>
            onChange({
              ...pendulum,
              initialAngle: parseFloat(e.target.value) ?? 0,
            })
          }
          min={PendulumConst.ANGLE_MIN}
          max={PendulumConst.ANGLE_MAX}
          step={PendulumConst.ANGLE_STEP}
        />
      </label>
    </form>
  );
};
