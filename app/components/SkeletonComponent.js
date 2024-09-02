"use client";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  Pagination,
} from "@mui/material";

const SkeletonComponent = () => {
  return (
    <>
      <Skeleton width='100%' maxWidth='800' height={200} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
          maxWidth: 800,
        }}>
        <Pagination
          showFirstButton
          showLastButton
          shape='rounded'
          variant='outlined'
          color='secondary'
        />
      </Box>
    </>
  );
};

export default SkeletonComponent;
