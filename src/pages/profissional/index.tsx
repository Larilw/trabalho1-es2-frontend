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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

interface PageProfissionalProps {}

const PageProfissional = ({}: PageProfissionalProps) => {
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

  dayjs.extend(customParseFormat);
  const formatoData = "DD/MM/YYYY";
  const dayjsComFormato = dayjs().format(formatoData);
  const adapter = new AdapterDayjs({ locale: dayjsComFormato });

  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const handleRaceChange = (event: SelectChangeEvent) => {
    setRace(event.target.value as string);
  };

  const handleExpertiseChange = (event: SelectChangeEvent) => {
    setExpertise(event.target.value as string);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

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
              placeHolder="Buscar profissional"
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
            <Typography sx={{ marginLeft: "0.1rem" }}>Profissionais</Typography>
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
                dialogText="Confirme a exclusão do funcionário"
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
                formTitle="Dados do Profissional"
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
                  <Typography variant="h5">Dados do Profissional</Typography>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Nome completo"
                    variant="outlined"
                    onChange={handleNameChange}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Data de Nascimento"
                        format="DD/MM/YYYY"
                        onChange={(newDate: Date | null) => setDate(newDate)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <FormControl fullWidth>
                    <InputLabel id="gender-select-label">Gênero</InputLabel>
                    <Select
                      labelId="gender-select-label"
                      id="gender-select"
                      value={gender}
                      label="Gender"
                      onChange={handleGenderChange}
                    >
                      <MenuItem value={"fem"}>Feminino</MenuItem>
                      <MenuItem value={"mas"}>Masculino</MenuItem>
                      <MenuItem value={"nonbi"}>Não binário</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="racial-select-label">Raça</InputLabel>
                    <Select
                      labelId="racial-select-label"
                      id="racial-select"
                      value={race}
                      label="Race"
                      onChange={handleRaceChange}
                    >
                      <MenuItem value={"white"}>Branco</MenuItem>
                      <MenuItem value={"yellow"}>Amarelo</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="expertise-select-label">
                      Especialidade
                    </InputLabel>
                    <Select
                      labelId="expertise-select-label"
                      id="expertise-select"
                      value={expertise}
                      label="Expertise"
                      onChange={handleExpertiseChange}
                    >
                      <MenuItem value={"fullstack"}>
                        Desenvolvedor fullstack
                      </MenuItem>
                      <MenuItem value={"back"}>Desenvolvedor backend</MenuItem>
                    </Select>
                  </FormControl>
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

export default PageProfissional;
