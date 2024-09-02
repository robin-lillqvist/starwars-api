"use client";

import { Box, Skeleton, Pagination } from "@mui/material";

const SkeletonComponent = () => {
  return (
    <>
      <Skeleton width='100%' height={200} />
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
        />
      </Box>
    </>
  );
};

export default SkeletonComponent;
