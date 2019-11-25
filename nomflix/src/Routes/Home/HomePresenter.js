import React from "react";
import PorpTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "../../Components/Loader";

const Container = styled.div`
  padding: 0px 20px;
`;

const HomePresenter = ({ nowPlaying, upcoming, popular, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title="Now Playing">
          {nowPlaying.map(movie => <span key={movie.id}>{movie.title}</span>)}
        </Section>
      )}
      {upcoming && upcoming.length > 0 && (
        <Section title="Upcoming Playing">
          {upcoming.map(movie => <span key={movie.id}>{movie.title}</span>)}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular Playing">
          {popular.map(movie => <span key={movie.id}>{movie.title}</span>)}
        </Section>
      )}
    </Container>
  );

HomePresenter.propTypes = {
  nowPlaying: PorpTypes.array,
  upcoming: PorpTypes.array,
  popular: PorpTypes.array,
  loading: PorpTypes.bool.isRequired,
  error: PorpTypes.string
};

export default HomePresenter;
