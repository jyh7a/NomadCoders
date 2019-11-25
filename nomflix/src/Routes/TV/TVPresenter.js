import React from "react";
import PorpTypes from "prop-types";
import styled from "styled-components";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";

const Container = styled.div`
  padding: 0 20px;
`;

const TVPresenter = ({ topRated, popular, airingToday, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {topRated && topRated.length > 0 && (
        <Section title="Top Rated Shows">
          {topRated.map(show => <span key={show.id}>{show.name}></span>)}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular Shows">
          {popular.map(show => <span key={show.id}>{show.name}></span>)}
        </Section>
      )}
      {airingToday && airingToday.length > 0 && (
        <Section title="Airing Shows">
          {airingToday.map(show => <span key={show.id}>{show.name}></span>)}
        </Section>
      )}
    </Container>
  );

TVPresenter.propTypes = {
  topRated: PorpTypes.array,
  popular: PorpTypes.array,
  airingToday: PorpTypes.array,
  loading: PorpTypes.bool.isRequired,
  error: PorpTypes.string
};

export default TVPresenter;
