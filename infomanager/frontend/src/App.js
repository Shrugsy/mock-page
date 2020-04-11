import React from "react";
import HeaderSection from "./components/HeaderSection";
import Content from "./components/Content";
import FooterSection from "./components/FooterSection";
import { Responsive } from "semantic-ui-react";
import Alerts from "./components/Alerts";
import PersonForm from './components/PersonForm'
import PersonTable from './components/PersonTable'

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
      <Content LeftComponent={PersonForm} RightComponent={PersonTable} />
      <FooterSection />
    </div>
  );
}

export default App;
