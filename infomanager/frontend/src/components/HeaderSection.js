import React from "react";
import { Header, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledSegment = styled(Segment)({
  padding: "0 !important",
  boxShadow: "none !important",
});

export default function HeaderSection({ mobile }) {
  return (
    <StyledSegment>
      <Header
        as="h1"
        content="Info Manager"
        textAlign="center"
        color="blue"
        style={{
          paddingTop: mobile ? "1.5em" : "3em",
          paddingBottom: mobile ? "1.5em" : "3em",
          backgroundColor: "#F9FAFB",
        }}
      />
    </StyledSegment>
  );
}

HeaderSection.propTypes = {
  mobile: PropTypes.bool,
};
