import React from "react";
import { Button, Form } from "semantic-ui-react";
import styled from "styled-components";

const StyledForm = styled(Form)({
  border: "1px solid rgba(34,36,38,.15)",
  borderRadius: ".28571429rem",
  padding: "15px",
});

const StyledInput = styled(Form.Input)({
  padding: "0 !important",
});

const StyledButtonContainer = styled.div`
  overflow: hidden;
`;

export default function PersonForm() {
  return (
    <StyledForm>
      <Form.Group inline>
        <Form.Field label="First Name" width={3} />
        <StyledInput placeholder="First Name" width={13} />
      </Form.Group>
      <Form.Group inline>
        <Form.Field label="Last Name" width={3} />
        <StyledInput placeholder="Last Name" width={13} />
      </Form.Group>
      <Form.Group inline>
        <Form.Field label="Email" width={3} />
        <StyledInput placeholder="Email" width={13} />
      </Form.Group>
      <Form.Group inline>
        <Form.Field label="Age" width={3} />
        <StyledInput placeholder="Age" width={13} />
      </Form.Group>
      <Form.Group inline>
        <Form.Field label="Income" width={3} />
        <StyledInput placeholder="Income" width={13} />
      </Form.Group>
      <StyledButtonContainer>
        <Button floated="right">Submit</Button>
      </StyledButtonContainer>
    </StyledForm>
  );
}
