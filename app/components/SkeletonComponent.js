"use client";

import { Box, Skeleton, Pagination } from "@mui/material";

const SkeletonComponent = () => {
  return (
    <>
      <Skeleton
        height={200}
        sx={{ backgroundColor: "#222831" }}
        variant='rectangular'
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}>
        <Pagination
          showFirstButton
          showLastButton
          shape='rounded'
          variant='outlined'
          color='secondary'
          disabled={true}
        />
      </Box>
    </>
  );
};

export default SkeletonComponent;
