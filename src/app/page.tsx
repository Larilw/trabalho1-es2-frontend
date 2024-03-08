"use client";
import CustomList from "@/components/List";
import BarraBusca from "@/components/SearchBar";
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
import PageProfissional from "@/pages/profissional";
import PageTime from "@/pages/time";
import PageProjeto from "@/pages/projeto";

export default function Home() {
  const [selectedTab, setSelectedTab] = React.useState("profissional");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#001f54" }}>
          <Toolbar>
            <Grid>
              <Typography variant="h6">Trabalho 1 - SCRUM</Typography>
              <Typography fontSize={"12px"}>
                Engenharia de Software 2
              </Typography>
            </Grid>
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
      {selectedTab === "profissional" && <PageProfissional />}
    </>
  );
}

//{selectedTab === "time" && <PageTime />}
//{selectedTab === "projeto" && <PageProjeto />}
