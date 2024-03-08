"use client";
// Material UI
import {
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Fab,
  Typography,
} from "@mui/material";
import SearchBar from "@/components/SearchBar";
import AddIcon from "@mui/icons-material/Add";
import CustomList from "@/components/List";
import { useState } from "react";
import Image from "next/image";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import FormDialog from "@/components/FormDialog";
import { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import React from "react";

const PageProjeto = () => {
  const [searchValue, setSearchValue] = useState("");
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [confirmationDeleteId, setConfirmationDeleteId] = useState<
    number | null
  >(null);
  const [confirmationSaveId, setConfirmationSaveId] = useState<number | null>(
    null
  );
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [name, setName] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  /*Lista do modal*/
  const [checked, setChecked] = React.useState<number[]>([]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  /* Lista do modal*/

  const items = [
    { name: "lari", id: 20, expertise: "fullstack" },
    { name: "vic", id: 2, expertise: "frontend" },
  ];

  return (
    <>
      <Grid container>
        <Grid
          container
          padding={"1rem"}
          sx={{ backgroundColor: "#fff" }}
          width={"50rem"}
          borderRadius={"2rem"}
          gap={1}
        >
          <Grid item xs={12}>
            <SearchBar
              placeHolder="Buscar time"
              value={searchValue}
              setValue={setSearchValue}
            ></SearchBar>
          </Grid>
          <Grid
            container
            item
            sx={{
              backgroundColor: "#edf2fb",
              padding: "1rem",
              borderRadius: "1rem",
              minHeight: "28rem",
              boxShadow: "0px 1px 1px 0px rgba(0,0,0,0.20)",
            }}
            xs={12}
            gap={1}
            flexDirection={"column"}
          >
            <Typography sx={{ marginLeft: "0.1rem" }}>Times</Typography>
            <Box
              padding={1}
              sx={{ backgroundColor: "background.paper", borderRadius: "1rem" }}
            >
              <CustomList
                items={items}
                onClick={(id) => {
                  setConfirmationSaveId(id);
                  setOpenFormDialog(true);
                }}
                onDelete={(id) => {
                  setConfirmationDeleteId(id);
                  setOpenConfirmationDialog(true);
                }}
                searchValue={searchValue}
              ></CustomList>
              <ConfirmationDialog
                dialogText="Confirme a exclusão do time"
                open={openConfirmationDialog}
                setOpen={setOpenConfirmationDialog}
                setConfirmation={(confirmed) => {
                  if (confirmed && confirmationDeleteId !== null) {
                    console.log("Excluir item com ID:", confirmationDeleteId);
                  }
                  setConfirmationDeleteId(null);
                }}
              />
              <FormDialog
                formTitle="Dados do Time"
                open={openFormDialog}
                setOpen={setOpenFormDialog}
                setConfirmation={(confirmed) => {
                  if (confirmed && confirmationSaveId !== null) {
                    console.log(
                      "Salvar informações do id:",
                      confirmationSaveId
                    );
                    console.log("INFO: ", name, checked);
                  } else if (confirmed && confirmationSaveId === null) {
                    console.log("Criar time com as informações");
                  }
                  setConfirmationSaveId(null);
                }}
              >
                <Grid
                  container
                  width={"32rem"}
                  justifyContent={"center"}
                  gap={1}
                >
                  <Typography variant="h5">Dados do Time</Typography>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Nome do Time"
                    variant="outlined"
                    onChange={handleNameChange}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      backgroundColor: "#edf2fb",
                      borderRadius: "1rem",
                      padding: "1rem",
                    }}
                  >
                    <Box
                      maxHeight={"15rem"}
                      sx={{
                        overflowY: "auto",
                        backgroundColor: "#edf2fb",
                      }}
                    >
                      <Typography>Integrantes do Time:</Typography>
                      <List
                        dense
                        sx={{
                          width: "100%",
                          bgcolor: "#edf2fb",
                        }}
                      >
                        {items.map((value) => {
                          const labelId = `checkbox-list-secondary-label-${value}`;
                          return (
                            <ListItem
                              key={value.id}
                              sx={{
                                boxShadow: "0px 1px 1px 0px rgba(0,0,0,0.20)",
                              }}
                              secondaryAction={
                                <Checkbox
                                  edge="end"
                                  onChange={handleToggle(value.id)}
                                  checked={checked.indexOf(value.id) !== -1}
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              }
                              disablePadding
                            >
                              <ListItemButton onClick={handleToggle(value.id)}>
                                <ListItemAvatar>
                                  <Avatar
                                    alt={`Avatar`}
                                    // src={`/static/images/avatar/${value + 1}.jpg`}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  id={labelId}
                                  primary={`${value.name} - ${value.expertise}`}
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </List>
                    </Box>
                  </Box>
                </Grid>
              </FormDialog>
            </Box>
            <Fab
              color="secondary"
              aria-label="add"
              onClick={(id) => {
                setConfirmationSaveId(null);
                setOpenFormDialog(true);
              }}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
        <Grid item>
          <Image
            src={"/kanban_ilustration.jpg"}
            alt="kanban-ilustration"
            width={500}
            height={500}
          ></Image>
        </Grid>
      </Grid>
    </>
  );
};

export default PageProjeto;
