"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Pagination,
  CircularProgress,
} from "@mui/material";

const StarshipList = () => {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAllStarships = async () => {
      setLoading(true);
      let allStarships = [];

      // Fetch the first page to get the total count and starships
      const res = await fetch("https://swapi.dev/api/starships/");
      const data = await res.json();
      allStarships = data.results;

      // Fetch remaining pages based on the count
      const totalPages = Math.ceil(data.count / 10);
      for (let page = 2; page <= totalPages; page++) {
        const res = await fetch(
          `https://swapi.dev/api/starships/?page=${page}`
        );
        const data = await res.json();
        allStarships = allStarships.concat(data.results);
      }

      setStarships(allStarships);
      setLoading(false);
    };

    fetchAllStarships();
  }, []);

  // Calculate the starships to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedStarships = starships.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Pagination
        count={Math.ceil(starships.length / itemsPerPage)}
        page={currentPage}
        onChange={(event, value) => {
          window.history.pushState(null, "", `?page=${value}`);
        }}
        sx={{ marginTop: 2 }}
      />
      <Stack container spacing={2}>
        {selectedStarships.map((starship) => (
          <Card>
            <CardContent>
              <Typography variant='h6'>{starship.name}</Typography>
              <Typography color='textSecondary'>
                Manufacturer: {starship.manufacturer}
              </Typography>
              <Typography color='textSecondary'>
                Crew: {starship.crew}
              </Typography>
              <Typography color='textSecondary'>
                Created: {new Date(starship.created).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </div>
  );
};

export default StarshipList;
