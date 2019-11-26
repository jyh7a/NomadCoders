import React from "react";
import PorpTypes from "prop-types";
import styled from "styled-components";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";

const Container = styled.div`
  padding: 20px;
`;

const TVPresenter = ({ topRated, popular, airingToday, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {topRated && topRated.length > 0 && (
        <Section title="Top Rated Shows">
          {topRated.map(show => (
            <Poster
              key={show.id}
              id={show.id}
              title={show.original_name}
              imageUrl={show.poster_path}
              ratring={show.vote_average}
              year={show.first_air_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular Shows">
          {popular.map(show => (
            <Poster
              key={show.id}
              id={show.id}
              title={show.original_name}
              imageUrl={show.poster_path}
              ratring={show.vote_average}
              year={show.first_air_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {airingToday && airingToday.length > 0 && (
        <Section title="Airing Shows">
          {airingToday.map(show => (
            <Poster
              key={show.id}
              id={show.id}
              title={show.original_name}
              imageUrl={show.poster_path}
              ratring={show.vote_average}
              year={show.first_air_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {error && <Message color="#e74c3c" text={error} />}
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
