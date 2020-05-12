export interface IPessoa {
    nome: string;
    sobrenome?: string; 
    cpf: string;
    telefone: string;
    nascimento: Date; 
}

export class Pessoa implements IPessoa {
    constructor (
        public nome: string,
        public cpf: string,
        public telefone: string,
        public nascimento: Date,
        public sobrenome?: string,
    ) {}
}