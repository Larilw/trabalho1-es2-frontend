import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  Fab,
  IconButton,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const apiData = [
  { id: 1, text: "Item 1" },
  { id: 2, text: "Item 2" },
  { id: 3, text: "Item 3" },
  { id: 4, text: "Item 4" },
  { id: 5, text: "Item 5" },
  { id: 6, text: "Item 6" },
  { id: 7, text: "Item 7" },
  { id: 8, text: "Item 8" },
  { id: 9, text: "Item 9" },
  { id: 10, text: "Item 10" },
  { id: 11, text: "Item 11" },
  { id: 12, text: "Item 12" },
  { id: 13, text: "Item 13" },
  { id: 14, text: "Item 14" },
  { id: 15, text: "Item 15" },
];

const Teste = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems={"center"}
    >
      <AppBar
        position="static"
        style={{ marginBottom: "8px", backgroundColor: "#292929" }}
      >
        <Toolbar>
          <Typography variant="h6">Tela de Teste</Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          width: "90%",
          padding: "10px",
          borderRadius: "10px",
          backgroundColor: "darkgrey",
        }}
      >
        <List
          sx={{
            width: "100%",
            height: "20rem",
            overflow: "auto",
          }}
        >
          {apiData.map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemText primary={item.text} />
              </ListItem>
              {index !== apiData.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
        <IconButton aria-label="search" sx={{ marginTop: "2px" }}>
          <SearchIcon sx={{ color: "blue" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Teste;
