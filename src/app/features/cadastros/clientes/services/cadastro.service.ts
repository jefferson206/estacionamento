import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movimentacao } from '../models/cadastro.model';
import { take } from 'rxjs/operators';
import { CrudBasicoService } from 'src/app/shared/services/crud-basico-generico.service';
import { API } from 'src/app/shared/api.constants';

@Injectable({
    providedIn: 'root'
})
export class MovimentacaoService extends CrudBasicoService<Movimentacao>{
    
    constructor(protected http: HttpClient) {
        super(http, API.ENDPOINT_MOVIMENTACAO);
    }

}