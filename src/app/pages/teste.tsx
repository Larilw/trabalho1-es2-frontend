"use client";
import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useSWR from "swr";

const Teste = () => {
  const [fetchData, setFetchData] = React.useState(false);

  const {
    data: apiData,
    error,
    isValidating,
  } = useSWR(fetchData ? `http://localhost:3333/teste/listar/` : null, (url) =>
    fetch(url).then((res) => res.json())
  );

  const handleClick = () => {
    setFetchData(true);
  };

  if (error) return <div>Erro ao carregar os dados.</div>;
  if (!apiData && isValidating) return <div>Carregando...</div>;

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
          {apiData?.result.map((item: any, index: number) => (
            <React.Fragment key={item.idTesteProfissional}>
              <ListItem>
                <ListItemText primary={item.nomeTesteProfissional} />
              </ListItem>
              {index !== apiData.result.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
        <IconButton
          aria-label="search"
          onClick={handleClick}
          sx={{ marginTop: "2px" }}
        >
          <SearchIcon sx={{ color: "blue" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Teste;
