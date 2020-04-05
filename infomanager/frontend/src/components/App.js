import React from "react";
import ReactDOM from 'react-dom';
import HeaderSection from "./HeaderSection";
import Content from "./Content";
import FooterSection from "./FooterSection";
import { Responsive } from "semantic-ui-react";

function App() {
  return (
      <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
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
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
    <App />
    , document.getElementById('root'));