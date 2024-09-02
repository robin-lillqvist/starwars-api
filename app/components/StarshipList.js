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
      console.log(data.results);
    };

    fetchStarships();
  }, []);

  return <div>StarshipList Component</div>;
};

export default StarshipList;
