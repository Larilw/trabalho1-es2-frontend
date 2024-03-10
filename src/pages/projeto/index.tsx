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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchBar from "@/components/SearchBar";
import AddIcon from "@mui/icons-material/Add";
import CustomList from "@/components/List";
import { useState, useEffect } from "react";
import Image from "next/image";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import FormDialog from "@/components/FormDialog";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { NumericFormat } from "react-number-format";
import { fetchDados } from "@/fetch";
import { Projeto } from "@/models/Projeto";

interface PriceInputProps {
  price: string;
  setPrice: (price: string) => void;
}

function PriceInput({ price, setPrice }: PriceInputProps) {
  return (
    <NumericFormat
      value={price}
      thousandSeparator={true}
      prefix={"R$ "}
      onValueChange={(values) => {
        setPrice(values.value);
      }}
      customInput={TextField}
      label="Preço"
      variant="outlined"
      fullWidth
    />
  );
}

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
  const [beginDate, setBeginDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [expertise, setExpertise] = useState("");
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

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

  const projetos = [
    { name: "lari", id: 1 },
    { name: "vic", id: 2 },
    { name: "x", id: 3 },
    { name: "x", id: 4 },
    { name: "x", id: 5 },
    { name: "x", id: 6 },
    { name: "x", id: 7 },
    { name: "x", id: 8 },
    { name: "x", id: 9 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const responseListar = await fetchDados(
        "projeto/listar",
        "GET"
      );
      console.log(responseListar);
    };
    fetchData();
  }, []);

  const handleClickCadastrar = async () => {
    const responseCadastro = await fetchDados("projeto/inserir", "POST", {
      nomeProjeto: "Teste consumo",
      objetivo: "Conseguir consumir",
      dataInicio: "2000-02-01",
      dataTermino: "2000-02-09",
      valor: 1000,
    });
    console.log("Cadastrou projeto");
  };

  const handleClickExcluir = async () => {
    const responseCadastro = await fetchDados("projeto/excluir/1", "PUT",);
    console.log("Exlcuiu projeto");
  };

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
                items={projetos}
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
                    handleClickExcluir();
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
                    console.log(
                      "INFO: ",
                      name,
                      beginDate,
                      endDate,
                      gender,
                      race,
                      expertise
                    );
                  } else if (confirmed && confirmationSaveId === null) {
                    console.log("Criar usuário com as informações");
                  }
                  setConfirmationSaveId(null);
                }}
              >
                <Grid container width={"32rem"} justifyContent={"left"} gap={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5">Dados do Projeto</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Nome do Projeto"
                      variant="outlined"
                      onChange={handleNameChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Nome do Cliente"
                      variant="outlined"
                      onChange={handleNameChange}
                    />
                  </Grid>
                  <Grid item width={"19.5rem"}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Objetivo do Projeto"
                      variant="outlined"
                      multiline
                      rows={4.1}
                      onChange={handleNameChange}
                    />
                  </Grid>
                  <Grid
                    container
                    item
                    width={"11.5rem"}
                    flexDirection={"column"}
                    gap={2}
                  >
                    <Grid item width={"11.5rem"}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Data de Início"
                          format="DD/MM/YYYY"
                          value={dayjs()}
                          onChange={(newDate: Dayjs | null) =>
                            setBeginDate(dayjs(newDate).toDate())
                          }
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item width={"11.5rem"}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Data de Término"
                          format="DD/MM/YYYY"
                          defaultValue={dayjs()}
                          onChange={(newDate: Dayjs | null) =>
                            setEndDate(dayjs(newDate).toDate())
                          }
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                  <Grid item width={"10rem"}>
                    <PriceInput price={price} setPrice={setPrice} />
                  </Grid>
                  <Grid item width={"21rem"}>
                    <FormControl fullWidth>
                      <InputLabel id="team-select-label">
                        Time Responsável
                      </InputLabel>
                      <Select
                        labelId="team-select-label"
                        id="team-select"
                        label="Time Responsável"
                      ></Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </FormDialog>
            </Box>
            <Fab
              color="secondary"
              aria-label="add"
              onClick={(id) => {
                handleClickCadastrar;
                setName("");
                setBeginDate(null);
                setEndDate(null);
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
