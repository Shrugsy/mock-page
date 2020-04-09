import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addPerson, clearAddPersonSuccess } from "../actions/people";

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
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");

  const addPersonSuccess = useSelector((state) => state.info.addPersonSuccess);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const data = {
      firstname,
      lastname,
      email,
      age,
      income,
    };
    dispatch(addPerson(data));
  };

  useEffect(() => {
    if (addPersonSuccess) {
      setFirstname("");
      setLastname("");
      setEmail("");
      setAge("");
      setIncome("");
      dispatch(clearAddPersonSuccess())
    }
  }, [addPersonSuccess, dispatch]);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Form.Group inline>
        <Form.Field label="First Name" width={4} />
        <StyledInput
          required
          placeholder="First Name"
          width={12}
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </Form.Group>
      <Form.Group inline>
        <Form.Field label="Last Name" width={4} />
        <StyledInput
          required
          placeholder="Last Name"
          width={12}
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </Form.Group>
      <Form.Group inline>
        <Form.Field label="Email" width={4} />
        <StyledInput
          required
          type="email"
          placeholder="Email"
          width={12}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group inline>
        <Form.Field label="Age" width={4} />
        <StyledInput
          required
          type="number"
          placeholder="Age"
          width={12}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </Form.Group>
      <Form.Group inline>
        <Form.Field label="Income" width={4} />
        <StyledInput
          required
          type="number"
          placeholder="Income"
          width={12}
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
      </Form.Group>
      <StyledButtonContainer>
        <Button floated="right" type="submit" primary>
          Submit
        </Button>
      </StyledButtonContainer>
    </StyledForm>
  );
}
