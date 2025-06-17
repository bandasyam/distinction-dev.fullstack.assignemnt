import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";

import { callApi, ip } from "../utils/api.helpers";

export default function CustomCard({ el, setOpen, setProductData, setFormType, setDeleteArchiveOpen }: any) {
  function handleEditClick() {
    setFormType("edit");
    setProductData(el);
    setOpen(true);
  }

  async function handleDeleteClick() {
    setDeleteArchiveOpen({ open: true, type: "delete", id: el?.id });
  }

  async function handleArchiveClick() {
    setDeleteArchiveOpen({ open: true, type: el?.status == "archived" ? "unarchive" : "archive", id: el?.id });
  }

  return (
    <Card
      sx={{
        width: {
          xs: "90%",
          sm: "300px",
          md: "320px",
        },
        m: 1,
        flexShrink: 0,
      }}
    >
      <CardHeader
        action={
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "flex-end",
            }}
          >
            <IconButton aria-label="settings" onClick={handleEditClick}>
              <EditIcon />
            </IconButton>

            <IconButton aria-label="settings" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>

            <IconButton aria-label="settings" onClick={handleArchiveClick}>
              {el.status == "archive" ? <UnarchiveIcon /> : <ArchiveIcon />}
            </IconButton>
          </Box>
        }
        title={el?.name}
        style={{ textTransform: "capitalize" }}
        subheader={`₹${el?.price}`}
      />

      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {el.tags.toString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
