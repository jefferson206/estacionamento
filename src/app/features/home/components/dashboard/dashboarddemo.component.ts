import { MovimentacaoService } from 'src/app/features/cadastros/clientes/services/cadastro.service';
import {Component, OnInit} from '@angular/core';
import { Movimentacao } from '../../../cadastros/clientes/models/cadastro.model';
import { filter, map } from 'rxjs/operators';


@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardDemoComponent implements OnInit {

    movimentacoes: Movimentacao[];
    qtdMovimentacoes: number;
    maxSpaces: number = 30;
    qtdCheckOut:number = 0;

    constructor( private movimentacaoService: MovimentacaoService) { }

    ngOnInit() {
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

}

