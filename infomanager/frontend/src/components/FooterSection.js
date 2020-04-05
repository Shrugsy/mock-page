import React from "react";
import { Segment } from "semantic-ui-react";

export default function FooterSection() {
  return (
    <Segment
      textAlign="center"
      style={{
        backgroundColor: "#F9FAFB",
      }}
    >
      Copyright {new Date().getFullYear()}
    </Segment>
  );
}
