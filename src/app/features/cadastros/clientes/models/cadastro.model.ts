import { Periodo } from './../../../../shared/models/periodo.model';
import { Veiculo } from 'src/app/shared/models/veiculo.model';
import { Pessoa } from 'src/app/shared/models/pessoa.model';

export interface IMovimentacao {
    id?: number;  
    cliente: Pessoa;
    veiculo: Veiculo;
    movimentacao: Periodo;
    preco: number;
}

export class Movimentacao implements IMovimentacao {
    constructor(
        public cliente: Pessoa,
        public veiculo: Veiculo,
        public movimentacao: Periodo,
        public preco: number,
        public id?: number,
    ) {}
}