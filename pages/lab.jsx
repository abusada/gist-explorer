import React, { useState, useEffect, useReducer } from "react";
import GistsList from "../components/GistsList";
import Container from "@material-ui/core/Container";

const Lab = (props) => (
  <Container maxWidth="sm">
    <GistsList owner="abusada" />
  </Container>
);

export default Lab;
