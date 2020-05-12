import { Observable } from 'rxjs';
import { UpperCasePipe, DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ResolveFieldDataService } from '../../../../../shared/services/resolve-fieldset.service';
import { MovimentacaoService } from '../../services/cadastro.service';
import { Movimentacao } from '../../models/cadastro.model';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styles: []
})
export class ListaClienteComponent implements OnInit {
	movimentacoes$: Observable<Movimentacao[]>;
	colunas: any[];
	selectedMovimentacao: Movimentacao;

  	constructor(private cadastroService: MovimentacaoService, 
				private router: Router, 
				private activatedRoute: ActivatedRoute,
				private resolveFields: ResolveFieldDataService) { }

	ngOnInit() {
		this.movimentacoes$ = this.cadastroService.buscarTodos()
			.pipe(
				filter(req => req.ok),
				map((req: any) => req.body)
			)
		this.constroiColunas();
	}

	atualizarMovimentacao(id){
		this.router.navigate([id], {relativeTo: this.activatedRoute})
	}

	constroiColunas(){
		this.colunas = [
			{ field: 'nome', header: 'Cliente'},
			{ field: 'telefone', header: 'Celular'},
			{ field: 'veiculo.marca', header: 'Marca'},
			{ field: 'veiculo.modelo', header: 'Modelo'},
			{ field: 'veiculo.placa', header: 'Placa'},
			{ field: 'movimentacao.dataInicial', header: 'Entrada'},
			{ field: 'movimentacao.dataFinal', header: 'Saída'},
			{ field: 'preco', header: 'Total a Pagar'}
		]
	}

	private novoCadastro() {
		this.router.navigate(['novo'], {relativeTo: this.activatedRoute});
	}
}
