import React from "react";
import { Container, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";

export default function Content({ LeftComponent, RightComponent }) {
  return (
    <Container style={{ padding: "3rem 0", flexGrow: "1" }}>
      <Grid stackable>
        <Grid.Column width={7}>
          <LeftComponent />
        </Grid.Column>
        <Grid.Column width={9}>
          <RightComponent />
        </Grid.Column>
      </Grid>
    </Container>
  );
}

Content.propTypes = {
  LeftComponent: PropTypes.elementType.isRequired,
  RightComponent: PropTypes.elementType.isRequired,
};
