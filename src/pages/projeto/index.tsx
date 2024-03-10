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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
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
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [expertise, setExpertise] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<string | null>(null);

  dayjs.extend(customParseFormat);
  const formatoData = "DD/MM/YYYY";
  const dayjsComFormato = dayjs().format(formatoData);
  const adapter = new AdapterDayjs({ locale: dayjsComFormato });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  /*Lista do modal*/
  const [checked, setChecked] = React.useState([1]);

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
    { name: "lari", id: 1 },
    { name: "vic", id: 2 },
    { name: "x", id: 3 },
    { name: "x", id: 4 },
    { name: "x", id: 5 },
    { name: "x", id: 6 },
    { name: "x", id: 7 },
    { name: "x", id: 8 },
    { name: "x", id: 9 },
    { name: "x", id: 10 },
    { name: "x", id: 11 },
    { name: "x", id: 12 },
    { name: "x", id: 13 },
    { name: "x", id: 14 },
    { name: "x", id: 15 },
    { name: "x", id: 16 },
  ];

  return (
    <>
      <Grid container gap={3}>
        <Grid
          container
          padding={"1rem"}
          sx={{ backgroundColor: "#fff" }}
          width={"50rem"}
          borderRadius={"2rem"}
          gap={2}
        >
          <Grid item xs={12}>
            <SearchBar
              placeHolder="Buscar projeto"
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
              boxShadow: "0px 1px 1px 0px rgba(0,0,0,0.20)",
            }}
            xs={12}
            gap={1}
            flexDirection={"column"}
          >
            <Typography sx={{ marginLeft: "0.1rem" }}>Projetos</Typography>
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
                dialogText="Confirme a exclusão do projeto"
                open={openConfirmationDialog}
                setOpen={setOpenConfirmationDialog}
                setConfirmation={(confirmed) => {
                  if (confirmed && confirmationDeleteId !== null) {
                    // Faça a lógica de exclusão aqui
                    console.log("Excluir item com ID:", confirmationDeleteId);
                  }
                  setConfirmationDeleteId(null);
                }}
              />
              <FormDialog
                formTitle="Dados do Projeto"
                open={openFormDialog}
                setOpen={setOpenFormDialog}
                setConfirmation={(confirmed) => {
                  if (confirmed && confirmationSaveId !== null) {
                    console.log(
                      "Salvar informações do id:",
                      confirmationSaveId
                    );
                    console.log("INFO: ", name, date, gender, race, expertise);
                  } else if (confirmed && confirmationSaveId === null) {
                    console.log("Criar usuário com as informações");
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
                  <Typography variant="h5">Dados do Projeto</Typography>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Nome do Projeto"
                    variant="outlined"
                    onChange={handleNameChange}
                  />
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Nome do Cliente"
                    variant="outlined"
                    onChange={handleNameChange}
                  />
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Objetivo do Projeto"
                    variant="outlined"
                    onChange={handleNameChange}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Data de Início"
                        format="DD/MM/YYYY"
                        onChange={(newDate: Date | null) => setDate(newDate)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Data de Término"
                        format="DD/MM/YYYY"
                        onChange={(newDate: Date | null) => setDate(newDate)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {/*
                  <TextField
                    label="react-number-format"
                    value={values.toFixed(2)}
                    onChange={handleChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                   */}
                  {/* <FormControl fullWidth>
      <InputLabel id="team-select-label">
        Time responsável
      </InputLabel>
      <Select
        labelId="team-select-label"
        id="team-select"
        value={items}
        label="Time Responsável"
        // onChange={handleExpertiseChange}
      >
        {expertiseOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl> */}
                </Grid>
              </FormDialog>
            </Box>
            <Fab
              color="secondary"
              aria-label="add"
              onClick={(id) => {
                setName("");
                setDate(null);
                setExpertise("");
                setRace("");
                setGender("");
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
            src={"/project.svg"}
            alt="project-ilustration"
            width={500}
            height={500}
          ></Image>
          <Typography sx={{ fontSize: "0.6rem" }}>
            <a
              href="https://storyset.com/people"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "grey", textDecoration: "none" }}
            >
              People illustrations by Storyset
            </a>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default PageProjeto;
