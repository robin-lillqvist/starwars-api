// pages/index.js
import React from "react";
import StarshipList from "./components/StarshipList";

export default function Home() {
  return (
    <div>
      <h1>Star Wars Starships</h1>
      <StarshipList />
    </div>
  );
}
