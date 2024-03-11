import { Profissional } from "../Profissional";

export interface Time {
    idTime: number;
    nomeTime: string;
    equipe: Profissional[];
}
