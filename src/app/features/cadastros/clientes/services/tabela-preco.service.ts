import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TabelaPrecoService {
    constructor() {}
    private valor:number;

    calcular(periodo){
		let inicio = new Date(periodo.movimentacao.dataInicial)
		let horasEntrada = inicio.getHours();
		let minutosEntrada = inicio.getMinutes();

		let final = new Date(periodo.movimentacao.dataFinal)
		let horasSaida = final.getHours();
		let minutosSaida = final.getMinutes();
		
		let resultadoDeDias = final.getDay() - inicio.getDay();
		let resultadoDeHoras = horasSaida - horasEntrada 
		let resultadoDeMinutos = minutosSaida - minutosEntrada
		
		this.tabelaDePreco(resultadoDeMinutos, resultadoDeHoras, resultadoDeDias)
        return this.valor;
    }

    private tabelaDePreco(resultadoDeMinutos, resultadoDeHoras, resultadoDeDias){
		if(Math.sign(resultadoDeDias) >= 1){
			return this.valor = 12;
		} else {
			if(Math.sign(resultadoDeMinutos) === -1){
				return
			} else if(resultadoDeMinutos == 0) {
				this.valor = 0;
			} else if(resultadoDeMinutos <=30) {
				this.valor = 2;
			} else {
				this.valor = 3.50;
			}
	
			if(Math.sign(resultadoDeHoras) === -1){
				return
			} else if(resultadoDeHoras == 0){
				return this.valor;
			} else if(resultadoDeHoras <= 2) {
				return this.valor = 6;
			} else if(resultadoDeHoras <= 4) {
				return this.valor = 8;
			} else { 
				return this.valor = 12;
			}
		}
	}
}