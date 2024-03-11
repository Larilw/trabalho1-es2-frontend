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
import { Time } from "@/models/Time";

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
  const [beginDate, setBeginDate] = useState<Date | null>(dayjs().toDate());
  const [endDate, setEndDate] = useState<Date | null>(dayjs().toDate());
  const [formattedBeginDate, setFormattedBeginDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [clientes, setClientes] = useState([]);
  const [times, setTimes] = useState<Time[]>([]);
  const [timeSelecionado, setTimeSelecionado] = React.useState<Number>();

  dayjs.extend(customParseFormat);
  const formatoData = "DD/MM/YYYY";
  const dayjsComFormato = dayjs().format(formatoData);
  const adapter = new AdapterDayjs({ locale: dayjsComFormato });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProjetos = await fetchDados("projeto/listar", "GET");
        setProjetos(responseProjetos.result);
      } catch (error) {
        console.error("Erro ao listar projetos:", error);
      }

      try {
        // Pega a listagem de times para fornecer durante o cadastro
        const responseTimes = await fetchDados("time/listar", "GET");
        setTimes(responseTimes.result);
      } catch (error) {
        console.error("Erro ao listar times:", error);
      }
    };
    fetchData();
  }, []);

  const handleClickCadastrar = async () => {
    const formattedBeginDate = beginDate
      ? dayjs(beginDate).format("YYYY-MM-DD")
      : "";
    const formattedEndDate = endDate ? dayjs(endDate).format("YYYY-MM-DD") : "";

    setFormattedBeginDate(formattedBeginDate);
    setFormattedEndDate(formattedEndDate);
    console.log("LOG DO REGISTRO", {
      nomeProjeto: name,
      objetivo: description,
      dataInicio: formattedBeginDate,
      dataTermino: formattedEndDate,
      valor: price,
      Cliente_idCliente: 1,
      Time_idTime: timeSelecionado,
    });

    const responseCadastro = await fetchDados("projeto/inserir", "POST", {
      nomeProjeto: name,
      objetivo: description,
      dataInicio: formattedBeginDate,
      dataTermino: formattedEndDate,
      valor: price,
      Cliente_idCliente: 10,
      Time_idTime: timeSelecionado,
    });
    console.log("RESPONSE", responseCadastro);
  };

  const handleClickBuscarProjeto = async (id: number) => {
    const fetchData = async () => {
      try {
        const responseProjetos = await fetchDados(
          `projeto/buscar/${id}`,
          "GET"
        );
        const projeto = responseProjetos.result;

        console.log({
          name: projeto.nomeProjeto,
          description: projeto.objetivo,
          formattedBeginDate: projeto.dataInicio,
          formattedEndDate: projeto.dataTermino,
          beginDate: new Date(projeto.dataInicio),
          endDate: new Date(projeto.dataTermino),
          price: projeto.valor,
          timeSelecionado: projeto.Time_idTime,
        });

        setName(projeto.nomeProjeto);
        setDescription(projeto.objetivo);
        setFormattedBeginDate(projeto.dataInicio);
        setFormattedEndDate(projeto.dataTermino);
        setBeginDate(new Date(projeto.dataInicio));
        setEndDate(new Date(projeto.dataTermino));
        setPrice(projeto.valor);
        setTimeSelecionado(projeto.Time_idTime);
      } catch (error) {
        console.error("Erro ao buscar projeto:", error);
      }
    };

    fetchData();
  };

  const handleClickExcluir = async () => {
    const responseCadastro = await fetchDados(
      `projeto/excluir/${confirmationDeleteId}`,
      "PUT"
    );
    console.log("Excluiu projeto");
    const responseProjetos = await fetchDados("projeto/listar", "GET");
    setProjetos(responseProjetos.result);
  };

  const handleClickAlterar = async (id: number) => {};

  return (
    <>
      <Grid container gap={3}>
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
              minHeight: "28rem",
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
                items={projetos.map((projeto) => ({
                  name: projeto.nomeProjeto,
                  id: projeto.idProjeto,
                }))}
                onClick={(id) => {
                  setConfirmationSaveId(id);
                  handleClickBuscarProjeto(id);
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
                    console.log("INFO: ", name, beginDate, endDate);
                    handleClickAlterar(confirmationSaveId);
                  } else if (confirmed && confirmationSaveId === null) {
                    handleClickCadastrar();
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Nome do Cliente"
                      variant="outlined"
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
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
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                          onChange={(newDate: Dayjs | null) =>
                            setBeginDate(newDate?.toDate() ?? null)
                          }
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item width={"11.5rem"}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Data de Término"
                          format="DD/MM/YYYY"
                          onChange={(newDate: Dayjs | null) =>
                            setEndDate(newDate?.toDate() ?? null)
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
                        label="Time Responsável"
                        value={timeSelecionado}
                        onChange={(e) => {
                          setTimeSelecionado(e.target.value as Number);
                        }}
                        MenuProps={{
                          PaperProps: { sx: { maxHeight: "8rem" } },
                        }}
                      >
                        {Array.isArray(times) &&
                          times.length > 0 &&
                          times.map((time: Time) => (
                            <MenuItem key={time.idTime} value={time.idTime}>
                              {time.nomeTime}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </FormDialog>
            </Box>
            <Fab
              color="secondary"
              aria-label="add"
              onClick={(id) => {
                setName("");
                setBeginDate(null);
                setEndDate(null);
                setClient("");
                setPrice("");
                setDescription("");
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
