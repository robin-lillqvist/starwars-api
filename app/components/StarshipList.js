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
  Box,
  Skeleton,
} from "@mui/material";
import styles from "./StarshipList.module.css";

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
    return (
      <div className={styles.loading}>
        {/*         <CircularProgress /> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            maxWidth: 800,
          }}>
          <Skeleton
            animation='wave'
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              maxWidth: 800,
            }}>
            <Card
              sx={{
                width: "100%",
                maxWidth: 800,
              }}>
              <CardContent>
                <Typography variant='h1'>Loading</Typography>
                <Typography color='textSecondary'>Loading</Typography>
                <Typography color='textSecondary'>Loading</Typography>
                <Typography color='textSecondary'>Loading</Typography>
              </CardContent>
            </Card>
          </Skeleton>
        </Box>
      </div>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
          maxWidth: 800,
        }}>
        <Pagination
          count={Math.ceil(starships.length / itemsPerPage)}
          page={currentPage}
          showFirstButton
          showLastButton
          shape='rounded'
          variant='outlined'
          color='secondary'
          onChange={(event, value) => {
            window.history.pushState(null, "", `?page=${value}`);
          }}
        />
      </Box>

      <Stack container spacing={2} sx={{ marginTop: 2 }}>
        {selectedStarships.map((starship) => (
          <Card>
            <CardContent>
              <Typography variant='h5'>{starship.name}</Typography>
              <Typography color='textSecondary'>
                <strong>Manufacturer:</strong> {starship.manufacturer}
              </Typography>
              <Typography color='textSecondary'>
                <strong>Crew:</strong> {starship.crew}
              </Typography>
              <Typography color='textSecondary'>
                <strong>Created:</strong>{" "}
                {new Date(starship.created).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default StarshipList;
