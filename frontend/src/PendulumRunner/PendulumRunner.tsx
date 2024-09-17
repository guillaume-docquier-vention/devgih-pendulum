import { faPause, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePendulumManager } from "../hooks/UsePendulumManager";
import { RunStatus } from "../models/run-status.enum";
import { PendulumForm } from "../PendulumForm/PendulumForm";
import { PendulumViewer } from "../PendulumViewer/PendulumViewer";
import "./PendulumRunner.scss";

export const PendulumRunner = () => {
  const { pendulums, setPendulums, status, setStatus, resetPendulums } =
    usePendulumManager();

  return (
    <div className="pendulum-runner-container">
      <div className="pendulum-card-list">
        {pendulums.map((pendulum, idx) => (
          <PendulumForm
            pendulum={pendulum}
            disabled={status !== RunStatus.STOPPED}
            key={idx}
            onChange={(p) => {
              setPendulums((prevPendulums) =>
                prevPendulums.map((pendulum) =>
                  pendulum.id === p.id ? p : pendulum
                )
              );
            }}
          />
        ))}
      </div>

      <div className="action-bars">
        <button
          className={
            [RunStatus.STARTED, RunStatus.RESUMED].includes(status)
              ? "pause-button round"
              : "start-button round"
          }
          onClick={() => {
            if ([RunStatus.STARTED, RunStatus.RESUMED].includes(status)) {
              setStatus(RunStatus.PAUSED);
            } else {
              setStatus(
                status === RunStatus.PAUSED
                  ? RunStatus.RESUMED
                  : RunStatus.STARTED
              );
            }
          }}
        >
          {[RunStatus.STARTED, RunStatus.RESUMED].includes(status) ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>

        <button
          className="reset-button round"
          onClick={() => {
            setStatus(RunStatus.STOPPED);
            resetPendulums();
          }}
          disabled={status === RunStatus.STOPPED}
        >
          <FontAwesomeIcon icon={faStop} />
        </button>
      </div>

      <div className="previewer">
        <PendulumViewer pendulums={pendulums} />
      </div>
    </div>
  );
};
