import { faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.scss";
import { PendulumRunner } from "./PendulumRunner/PendulumRunner";

function App() {
  return (
    <div className="app">
      <div className="header">
        <FontAwesomeIcon icon={faScaleBalanced} size="2x" />

        <h1>Pendulum</h1>
      </div>

      <div className="content">
        <PendulumRunner />
      </div>
    </div>
  );
}

export default App;
