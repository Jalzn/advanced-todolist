import React from "react";
import { Pagination, Stack } from "@mui/material";

export const TasksPagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
      <Pagination
        count={totalPages}
        page={currentPage + 1}
        onChange={(_, newPage) => onPageChange(newPage - 1)}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
};
