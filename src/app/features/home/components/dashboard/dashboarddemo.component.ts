import { UpperCasePipe } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {Component, OnInit } from '@angular/core';
import {registerLocaleData} from '@angular/common';

import { filter, map } from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import { ResolveFieldDataService } from './../../../../shared/services/resolve-fieldset.service';
import { Movimentacao } from './../../../cadastros/clientes/models/cadastro.model';
import { MovimentacaoService } from 'src/app/features/cadastros/clientes/services/cadastro.service';
import { CurrencyBrlPipe } from 'src/app/shared/components/pipes/currancyBrl';

registerLocaleData(localePt, 'pt');

@Component({
    templateUrl: './dashboard.component.html', 
    providers: [
        UpperCasePipe,
        CurrencyBrlPipe,
    ]
})
export class DashboardDemoComponent implements OnInit {
    movimentacoes: Observable<Movimentacao[]>;
    qtdMovimentacoes: number;
    maxSpaces: number = 30;
    qtdCheckOut:number = 0;
    colunas: any;
    tituloLista: string;
    
    constructor(private movimentacaoService: MovimentacaoService,
                private resolveFields: ResolveFieldDataService,
                private uppercase: UpperCasePipe,
                private currancy: CurrencyBrlPipe) { }

    ngOnInit() {
        this.carregarDashboard();
        this.constroiListagem();
    }

    carregarDashboard() {
        this.movimentacaoService.buscarTodos()
        .pipe(
            filter(req => req.ok),
            map((req: any) => req.body),
            map((req:any) => {
                this.qtdMovimentacoes = req.length;
                req.filter(el => {
                    if(el.movimentacao.dataFinal !== null)
                        this.qtdCheckOut += 1;
                })
            })
        ).subscribe();
    }

    constroiListagem() {
        this.tituloLista = "Listagem de movimentações";
        this.constroiColunas();
        this.movimentacoes = this.movimentacaoService.buscarTodos()
            .pipe(
                filter(req => req.ok),
                map((req: any) => req.body),
            );
    }

    private constroiColunas(){
		this.colunas = [
			{ field: 'nome', header: 'Cliente', type: this.uppercase },
			{ field: 'telefone', header: 'Celular'},
			{ field: 'veiculo.marca', header: 'Marca', type: this.uppercase},
			{ field: 'veiculo.modelo', header: 'Modelo', type: this.uppercase},
			{ field: 'veiculo.placa', header: 'Placa', type: this.uppercase},
			{ field: 'movimentacao.dataInicial', header: 'Entrada'},
			{ field: 'movimentacao.dataFinal', header: 'Saída'},
			{ field: 'preco', header: 'Total a Pagar', type: this.currancy}
		];
    }
}

