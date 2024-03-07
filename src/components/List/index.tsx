import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
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
}

export default function CustomList({
  items,
  onClick,
  onDelete,
}: CustomListProps) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {items.map((value) => {
        const labelId = `checkbox-list-label-${value.id}`;

        return (
          <ListItem
            key={value.id}
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
  );
}
