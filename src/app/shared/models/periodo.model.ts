export interface IPeriodo {
    dataInicial: Date;
    dataFinal: Date;
}

export class Periodo implements IPeriodo {
    constructor( 
        public dataInicial: Date,
        public dataFinal: Date
    ) {}
}