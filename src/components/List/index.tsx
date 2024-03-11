import * as React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface CustomListProps {
  items: {
    name: string;
    id: number;
  }[];
  onClick: (id: number) => void;
  onDelete: (id: number) => void;
  searchValue: string;
}

export default function CustomList({
  items,
  onClick,
  onDelete,
  searchValue,
}: CustomListProps) {
  return (
    <Box
      overflow={"auto"}
      sx={{
        maxHeight: "19rem",
        bgcolor: "background.paper",
        borderRadius: "1rem",
      }}
    >
      <List
        sx={{
          width: "100%",
        }}
      >
        {items
          .filter((items) => items.name.includes(searchValue))
          .map((value) => {
            const labelId = `list-label-${value.id}`;
            return (
              <ListItem
                key={value.id}
                sx={{ boxShadow: "0px 1px 1px 0px rgba(0,0,0,0.20)" }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => onDelete(value.id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={() => onClick(value.id)}
                  dense
                >
                  <ListItemText id={labelId} primary={`${value.name}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
}
