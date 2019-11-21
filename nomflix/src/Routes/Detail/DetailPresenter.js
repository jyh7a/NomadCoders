import React from "react";
import PorpTypes from "prop-types";
import styled from "styled-components";

const DetailPresenter = ({ result, error, loading }) => null;

DetailPresenter.propTypes = {
  result: PorpTypes.array,
  error: PorpTypes.array,
  loading: PorpTypes.bool.isRequired
};

export default DetailPresenter;
