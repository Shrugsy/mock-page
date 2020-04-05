import React from "react";
import PersonForm from "./PersonForm";
import PersonTable from "./PersonTable";
import { Container, Grid } from "semantic-ui-react";

export default function Content() {
  return (
    <Container style={{padding: '3rem 0', flexGrow: '1'}}>
      <Grid stackable>
        <Grid.Column width={7}>
          <PersonForm />
        </Grid.Column>
        <Grid.Column width={9}>
          <PersonTable />
        </Grid.Column>
      </Grid>
    </Container>
  );
}
