import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items:center;
`;

const Loader = styled.span`
    font-size: 280px;
    display: inline-block;
    margin-top: -180px;
`;

export default () => (
  <Container>
    <Loader role="img" aria-label="Loading">
      ⏰
    </Loader>
  </Container>
);
