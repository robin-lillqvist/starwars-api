"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";

const StarshipDetail = ({ params }) => {
  const { id } = params;
  const [starship, setStarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchStarship = async () => {
      const res = await fetch(`https://swapi.dev/api/starships/${id}/`);
      const data = await res.json();
      setStarship(data);

      // Fetch the names of the movies the ship appears in...
      const filmPromises = data.films.map((filmUrl) =>
        fetch(filmUrl).then((res) => res.json())
      );
      const filmData = await Promise.all(filmPromises);
      setFilms(filmData);
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
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 2,
          gap: "2rem",
        }}>
        <Card>
          <CardContent>
            <h2 gutterBottom>{starship.name}</h2>
            <Typography>
              <strong>Model:</strong> {starship.model}
            </Typography>
            <Typography>
              <strong>Manufacturer:</strong> {starship.manufacturer}
            </Typography>
            <Typography>
              <strong>Cost in Credits:</strong> {starship.cost_in_credits}
            </Typography>
            <Typography>
              <strong>Length:</strong> {starship.length} meters
            </Typography>
            <Typography>
              <strong>Max Atmosphering Speed:</strong>{" "}
              {starship.max_atmosphering_speed} km/h
            </Typography>
            <Typography>
              <strong>Crew Size:</strong> {starship.crew}
            </Typography>
            <Typography>
              <strong>Passengers:</strong> {starship.passengers}
            </Typography>
            <Typography>
              <strong>Cargo Capacity:</strong> {starship.cargo_capacity} kg
            </Typography>
            <Typography>
              <strong>Consumables:</strong> {starship.consumables}
            </Typography>
            <Typography>
              <strong>Hyperdrive Rating:</strong> {starship.hyperdrive_rating}
            </Typography>
            <Typography>
              <strong>MGLT:</strong> {starship.MGLT} MGLT
            </Typography>
            <Typography>
              <strong>Starship Class:</strong> {starship.starship_class}
            </Typography>
            <Typography>
              <strong>Created Date:</strong>{" "}
              {new Date(starship.created).toLocaleDateString()}
            </Typography>

            <Typography gutterBottom sx={{ marginTop: 2 }}>
              As seen in:
            </Typography>
            <ul>
              {films.map((film, index) => (
                <li key={index}>{film.title}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Button onClick={() => router.push(`/`)} sx={{ color: "#B55400" }}>
          Go back to Shiplist
        </Button>
      </Box>
    </>
  );
};

export default StarshipDetail;
