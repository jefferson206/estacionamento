import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

export class CrudBasicoService<T> {
    constructor(protected http: HttpClient, private RESOURCE_URL) {}

    criar(registro: T): Observable<HttpResponse<T>> {
        return this.http.post<T>(this.RESOURCE_URL, registro, { observe: 'response' });
    }

    atualizar(registro: T | any): Observable<HttpResponse<T>> {
        return this.http.put<T>(`${this.RESOURCE_URL}`, registro, { observe: 'response' });
    }

    atualizarPorId(registo: T | any): Observable<HttpResponse<T>> {
        return this.http.put<T>( `${this.RESOURCE_URL}/${registo.id}`, registo, {observe: 'response'});
    }

    buscarPorId(id: number | string): Observable<HttpResponse<T>> {
        return this.http.get<T>(`${this.RESOURCE_URL}/${id}`, { observe: 'response' });
    }

    buscarTodos(): Observable<HttpResponse<T[]>> {
        return this.http.get<T[]>(this.RESOURCE_URL, {observe: 'response'});
    }

    deletar(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.RESOURCE_URL}/${id}`, { observe: 'response' });
    }
}