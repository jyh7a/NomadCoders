import React from "react";
import PorpTypes from "prop-types";
import styled from "styled-components";

const SearchPresenter = ({
   movieResults,
   tvResults,
   loading,
   error,
   searchTerm,
   handleSubmit
}) => null;

SearchPresenter.propTypes  = {
   movieResults: PorpTypes.array,
   tvResults: PorpTypes.array,
   loading: PorpTypes.bool.isRequired,
   error: PorpTypes.string,
   searchTerm: PorpTypes.string,
   handleSubmit: PorpTypes.func.isRequired
};

export default SearchPresenter;
