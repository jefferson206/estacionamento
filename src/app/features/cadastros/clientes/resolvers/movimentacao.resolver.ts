import { Injectable } from '@angular/core';
import { EntidadeGenericoResolver } from '../../../../shared/services/entidade-generico.resolver';
import { MovimentacaoService } from 'src/app/features/cadastros/clientes/services/cadastro.service';
import { Movimentacao } from 'src/app/features/cadastros/clientes/models/cadastro.model';

@Injectable({
	providedIn: 'root'
})
export class MovimentacaoGuard extends EntidadeGenericoResolver<Movimentacao> {

	constructor(protected movimentacaoService: MovimentacaoService) {
		super(movimentacaoService);
	 }

}
