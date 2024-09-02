"use client";
import React from "react";
import { Container } from "@mui/material";
import StarshipList from "./components/StarshipList";

export default function Home() {
  return (
    <Container>
      <StarshipList />
    </Container>
  );
}
