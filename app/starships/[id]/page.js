"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

const StarshipDetail = ({ params }) => {
  const { id } = params;
  const [starship, setStarship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStarship = async () => {
      const res = await fetch(`https://swapi.dev/api/starships/${id}/`);
      const data = await res.json();
      setStarship(data);
      setLoading(false);
    };

    fetchStarship();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant='h4' component='h1' gutterBottom>
            {starship.name}
          </Typography>
          <Typography variant='body1'>
            <strong>Model:</strong> {starship.model}
          </Typography>
          <Typography variant='body1'>
            <strong>Manufacturer:</strong> {starship.manufacturer}
          </Typography>
          <Typography variant='body1'>
            <strong>Crew Size:</strong> {starship.crew}
          </Typography>
          <Typography variant='body1'>
            <strong>Created Date:</strong>{" "}
            {new Date(starship.created).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StarshipDetail;
