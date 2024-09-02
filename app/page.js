// pages/index.js
import React from "react";
import { Container, Typography } from "@mui/material";
import StarshipList from "./components/StarshipList";

export default function Home() {
  return (
    <Container>
      <Typography variant='h4' component='h1' gutterBottom>
        Star Wars Starships
      </Typography>
      <StarshipList />
    </Container>
  );
}
