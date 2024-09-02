"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Pagination,
  CardActions,
  Box,
  Button,
} from "@mui/material";
import styles from "./StarshipList.module.css";
import SkeletonComponent from "./SkeletonComponent";
import { useRouter } from "next/navigation";

const StarshipList = () => {
  const router = useRouter();
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
        console.log(data);
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
        <SkeletonComponent />
      </div>
    );
  }

  return (
    <>
      <Stack container spacing={2}>
        {selectedStarships.map((starship, index) => {
          // Extract the ID from the starship URL
          const id = starship.url.split("/").filter(Boolean).pop();
          return (
            <Card sx={{ backgroundColor: "#222831" }}>
              <CardContent>
                <div></div>
                <Typography variant='h5' sx={{ color: "#B55400" }}>
                  {starship.name}
                </Typography>
                <Typography sx={{ color: "#EEEEEE" }}>
                  <strong>Manufacturer:</strong> {starship.manufacturer}
                </Typography>
                <Typography sx={{ color: "#EEEEEE" }}>
                  <strong>Crew:</strong> {starship.crew}
                </Typography>
                <Typography sx={{ color: "#EEEEEE" }}>
                  <strong>Created: </strong>
                  {new Date(starship.created).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => router.push(`/starships/${id}`)}
                  sx={{ color: "#B55400", fontWeight: "bold" }}>
                  Go to ship
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
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
    </>
  );
};

export default StarshipList;
