"use client";
import CustomList from "@/components/List";
import SearchBar from "@/components/SearchBar";
import { Grid } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Home() {
  //const [value, setValue] = useState("");
  const testlist = [
    { name: "lari", id: 1 },
    { name: "caio", id: 2 },
  ];
  const [selectedTab, setSelectedTab] = React.useState("profissional");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="profissional" label="Profissionais" />
          <Tab value="time" label="Times" />
          <Tab value="projeto" label="Projetos" />
        </Tabs>
      </Box>
      {selectedTab === "profissional" && <>oi</>}
      {selectedTab === "time" && <>time</>}
      {selectedTab === "projeto" && <>projeto</>}

      {/*
      <SearchBar
        placeHolder="Teste"
        value={value}
        setValue={setValue}
      ></SearchBar>
      <Grid
        container
        justifyContent={"center"}
        sx={{ backgroundColor: "green" }}
      >
        <CustomList
          items={testlist}
          onClick={(id) => console.log("onclick", id)}
          onDelete={(id) => console.log("ondelete", id)}
        ></CustomList>
      </Grid>
    */}
    </>
  );
}
