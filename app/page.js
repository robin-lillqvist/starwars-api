// pages/index.js
import React from "react";
import { Container, Typography } from "@mui/material";
import StarshipList from "./components/StarshipList";

export default function Home() {
  return (
    <Container>
      <h1>Star Wars Starships</h1>
      <StarshipList />
    </Container>
  );
}
