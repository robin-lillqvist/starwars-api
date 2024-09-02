// components/StarshipList.js
"use client";

import React, { useState, useEffect } from "react";

const StarshipList = () => {
  const [starships, setStarships] = useState([]);

  useEffect(() => {
    const fetchStarships = async () => {
      const res = await fetch("https://swapi.dev/api/starships/?page=1");
      const data = await res.json();
      setStarships(data.results);
    };

    fetchStarships();
  }, []);

  return (
    <div>
      {starships.map((starship) => (
        <div key={starship.url}>
          <h2>{starship.name}</h2>
          <p>Manufacturer: {starship.manufacturer}</p>
          <p>Crew: {starship.crew}</p>
          <p>Created: {new Date(starship.created).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default StarshipList;
