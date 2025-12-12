import "./styles.css";
import App from "./App.js";
import ReactDOM from "react-dom/client";
const start = new Date().getTime();
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
import * as Scheduler from "scheduler";

function update() {
  root.render(<App elapsed={new Date().getTime() - start} />);

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
