import { Time } from "../Time";

export interface Projeto {
  idProjeto: number;
  nomeProjeto: string;
  objetivo: string;
  dataInicio: string;
  dataTermino: string;
  valor: number;
  time: Time;
  cliente: string;
}

export interface Cliente {
  idCliente: number;
  nomeCompleto: string;
  nomeSocial: string;
}
