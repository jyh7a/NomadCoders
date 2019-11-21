import React from "react";
import PorpTypes from "prop-types";
import styled from "styled-components";

const TVPresenter = ({ topRated, popular, airingToday, loading, error }) =>
  null;

TVPresenter.propTypes = {
  topRated: PorpTypes.array,
  popular: PorpTypes.array,
  airingToday: PorpTypes.array,
  loading: PorpTypes.bool.isRequired,
  error: PorpTypes.string
};

export default TVPresenter;
