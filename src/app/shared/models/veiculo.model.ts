export interface IVeiculo {
    marca: string;  
    cor: string;  
    modelo: string;
    placa: string;
    observacoes: string;
}

export class Veiculo implements IVeiculo {
    constructor (
        public marca: string,
        public cor: string,
        public modelo: string,
        public placa: string,
        public observacoes: string,
    ) {}
}