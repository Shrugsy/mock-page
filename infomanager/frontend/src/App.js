import React from "react";
import ReactDOM from "react-dom";
import HeaderSection from "./components/HeaderSection";
import Content from "./components/Content";
import FooterSection from "./components/FooterSection";
import { Responsive } from "semantic-ui-react";
import { Provider } from "react-redux";
import store from "./store";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "./components/Alerts";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

function App() {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Alerts />
      <Responsive maxWidth="766">
        <HeaderSection mobile />
      </Responsive>
      <Responsive minWidth="767">
        <HeaderSection />
      </Responsive>
      <Content />
      <FooterSection />
    </div>
  );
}

// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);