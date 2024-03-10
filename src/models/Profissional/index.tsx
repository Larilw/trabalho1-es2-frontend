import { Endereco } from "../Endereco";
import { Time } from "../Time";

export interface Profissional {
    idProfissional: number;
    nomeCompleto: string;
    nomeSocial: string;
    cpf: string;
    dataNascimento: string;
    raca: string;
    genero: string;
    nroEndereco: number;
    complementoEndereco: string;
    cep: string;
    especialidade: string;
    time: Time;
    endereco: Endereco;
}