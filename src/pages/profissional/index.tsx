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
  TextFieldProps,
} from "@mui/material";
import SearchBar from "@/components/SearchBar";
import AddIcon from "@mui/icons-material/Add";
import CustomList from "@/components/List";
import { useEffect, useState } from "react";
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
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import InputMask from "react-input-mask";
import { fetchDados } from "@/fetch";
import { Profissional } from "@/models/Profissional";

const PageProfissional = () => {
  const [searchValue, setSearchValue] = useState("");
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [confirmationDeleteId, setConfirmationDeleteId] = useState<
    number | null
  >(null);
  const [confirmationSaveId, setConfirmationSaveId] = useState<number | null>(
    null
  );
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [bornDate, setBornDate] = useState<Date | null>(dayjs().toDate());
  const [formattedBornDate, setFormattedBornDate] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [expertise, setExpertise] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [cepNumerico, setCepNumerico] = useState<number | null>(null);
  const [numero, setNumero] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [unidadeFederativa, setUnidadeFederativa] = useState("");
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);

  dayjs.extend(customParseFormat);
  const formatoData = "DD/MM/YYYY";
  const dayjsComFormato = dayjs().format(formatoData);
  const adapter = new AdapterDayjs({ locale: dayjsComFormato });

  const buscarEndereco = async (cep: Number) => {
    console.log("viacep");
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error("CEP não encontrado");
      }
      const data = await response.json();
      setLogradouro(data.logradouro || "");
      setBairro(data.bairro || "");
      setCidade(data.localidade || "");
      setUnidadeFederativa(data.uf || "");
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
    }
  };

  useEffect(() => {
    if (
      cepNumerico &&
      cepNumerico.toString().length === 8 &&
      !isNaN(cepNumerico)
    ) {
      buscarEndereco(cepNumerico);
    }
  }, [cepNumerico]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDados("profissional/listar", "GET");
        setProfissionais(response.result);
      } catch (error) {
        console.error("Erro ao buscar profissionais:", error);
      }
    };
    fetchData();
  }, []);

  const handleClickCadastrar = async () => {
    const formattedBornDate = bornDate ? dayjs(bornDate).format("YYYY-MM-DD") : "";
    setFormattedBornDate(formattedBornDate);

    try {
      const responseBairro = await fetchDados("endereco/inserirBairro", "POST", {bairro: bairro});
      const responseLogradouro = await fetchDados("endereco/inserirLogradouro", "POST", {logradouro: logradouro, idTipoLogradouro: 1});
      const responseUnidadeFederativa = await fetchDados(`endereco/buscarIdUnidadeFederativa/${unidadeFederativa}`, "GET");
      const responseCidade = await fetchDados("endereco/inserirCidade", "POST", {cidade: cidade, idUnidadeFederativa: 1});
      const responseEndereco = await fetchDados("endereco/inserirEndereco", "POST", {cep: cep, idBairro: responseBairro.result.idBairro, idLogradouro: responseLogradouro.result.idLogradouro, idCidade: responseCidade.result.idCidade});
      console.log(responseEndereco);
      const responseCadastro = await fetchDados("profissional/inserir", "POST", {
          nomeCompleto: name,
          nomeSocial: "",
          cpf: cpf,
          dataNascimento: formattedBornDate,
          raca: race,
          genero: gender,
          nroEndereco: numero,
          complementoEndereco: "",
          cep,
          idEndereco: responseEndereco.result.idEndereco,
          idTime: 1,
          idEspecialidade: 1,
        }
      );
      console.log(responseCadastro);
      if (!responseCadastro.ok) {
        throw new Error("Erro ao cadastrar profissional");
      }
      console.log("Cadastrou profissional");
    } catch (error) {
      console.error("Erro ao cadastrar profissional:", error);
    }
    const responseListar = await fetchDados("projeto/listar", "GET");
    setProfissionais(responseListar.result);
  };

  const handleClickBuscar = async (id: number) => {
    try {
      const responseBusca = await fetchDados(`profissional/buscar/${id}`, "GET");
      if (!responseBusca.ok) {
        throw new Error("Erro ao buscar profissional");
      }
      /*
      setName(responseBusca.nomeCompleto);
      setDate(null);
      setGender(responseBusca.genero);
      setRace(responseBusca.raca);
      setExpertise("");
      setCpf(responseBusca.cpf);
      setNumero(responseBusca.nroEndereco);
      */
      //setBairro(responseBusca.bairro);
      //setCidade(responseBusca.cidade);
      //setLogradouro(responseBusca.logradouro);
      //setUnidadeFederativa(responseBusca.unidadeFederativa);
      //setCep(responseBusca.cep);
      //setCepNumerico(null);
    } catch (error) {
      console.error("Erro ao buscar profissional:", error);
    }
  };

  const handleClickExcluir = async (id: number) => {
    const responseExclusao = await fetchDados(`profissional/excluir/${id}`, "PUT");
    console.log("Excluiu projeto");
    const responseListar = await fetchDados("profissional/listar", "GET");
    setProfissionais(responseListar.result);
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
                items={profissionais.map((profissional) => ({
                  name: profissional.nomeCompleto,
                  id: profissional.idProfissional,
                }))}
                onClick={(id) => {
                  setConfirmationSaveId(id);
                  handleClickBuscar(id);
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
                    handleClickCadastrar();
                  } else {
                    setName("");
                    setDate(null);
                    setGender("");
                    setRace("");
                    setExpertise("");
                    setCpf("");
                    setBairro("");
                    setNumero("");
                    setCidade("");
                    setLogradouro("");
                    setUnidadeFederativa("");
                    setCep("");
                    setCepNumerico(null);
                  }
                  setConfirmationSaveId(null);
                }}
              >
                <Grid container justifyContent={"left"} gap={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5">Dados do Profissional</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">Dados Pessoais</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Nome completo"
                      variant="outlined"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item width={"13rem"}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Data de Nascimento"
                        format="DD/MM/YYYY"
                        defaultValue={dayjs()}
                        onChange={(newDate: Dayjs | null) =>
                          setDate(dayjs(newDate).toDate())
                        }
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item width={"10rem"}>
                    <InputMask
                      mask="999.999.999-99"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      disabled={false}
                      maskChar=" "
                    >
                      <TextField label="CPF" variant="outlined" />
                    </InputMask>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="gender-select-label">Gênero</InputLabel>
                      <Select
                        labelId="gender-select-label"
                        id="gender-select"
                        value={gender}
                        label="Gênero"
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <MenuItem value={"Feminino"}>Feminino</MenuItem>
                        <MenuItem value={"Masculino"}>Masculino</MenuItem>
                        <MenuItem value={"Não binário"}>Não binário</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel id="racial-select-label">Raça</InputLabel>
                      <Select
                        labelId="racial-select-label"
                        id="racial-select"
                        value={race}
                        label="Raça"
                        onChange={(e) => setRace(e.target.value)}
                      >
                        <MenuItem value={"Preto"}>Preto</MenuItem>
                        <MenuItem value={"Pardo"}>Pardo</MenuItem>
                        <MenuItem value={"Branco"}>Branco</MenuItem>
                        <MenuItem value={"Indígen"}>Indígena</MenuItem>
                        <MenuItem value={"Amarelo"}>Amarelo</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item width={"13rem"}>
                    <FormControl fullWidth>
                      <InputLabel id="expertise-select-label">
                        Especialidade
                      </InputLabel>
                      <Select
                        labelId="expertise-select-label"
                        id="expertise-select"
                        value={expertise}
                        label="Especialidade"
                        onChange={(e) => setExpertise(e.target.value)}
                      >
                        <MenuItem value={"fullstack"}>
                          Desenvolvedor fullstack
                        </MenuItem>
                        <MenuItem value={"back"}>
                          Desenvolvedor backend
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Endereço</Typography>
                  </Grid>
                  <Grid item width={"6.7rem"}>
                    <InputMask
                      mask="99999-999"
                      value={cep}
                      onChange={(e) => {
                        const cepDigits = e.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
                        setCep(e.target.value);
                        setCepNumerico(
                          cepDigits !== "" ? parseInt(cepDigits, 10) : null // Converte para null ou para o número do cep
                        );
                      }}
                      maskChar=" "
                    >
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="CEP"
                        variant="outlined"
                        type="text"
                      />
                    </InputMask>
                  </Grid>
                  <Grid item width={"25.7rem"}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Logradouro"
                      variant="outlined"
                      value={logradouro}
                      onChange={(e) => setLogradouro(e.target.value)}
                    />
                  </Grid>
                  <Grid item width={"6.7rem"}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Número"
                      variant="outlined"
                      value={numero}
                      type="number"
                      onChange={(e) => setNumero(e.target.value)}
                    />
                  </Grid>
                  <Grid item width={"3.5rem"}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="UF"
                      variant="outlined"
                      value={unidadeFederativa}
                      onChange={(e) => setUnidadeFederativa(e.target.value)}
                    />
                  </Grid>
                  <Grid item width={"21.2rem"}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Cidade"
                      variant="outlined"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Bairro"
                      variant="outlined"
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                    />
                  </Grid>
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
            src={"/people.svg"}
            alt="people-ilustration"
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

export default PageProfissional;
