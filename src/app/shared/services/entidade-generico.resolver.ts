import { Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CrudBasicoService } from './crud-basico-generico.service';
import { filter, map } from 'rxjs/operators';

export class EntidadeGenericoResolver<T> implements Resolve<T> {
    constructor(protected service: CrudBasicoService<T>) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T {
        const id = route.params.id;

        if(id != null){
            return this.service.buscarPorId(id).pipe(
                filter(res => res.ok),
                map(res => res.body),
                map( (body: any) => {
                    if(body.data) {
                        return body.data;
                    }
                    return body;
                })
            );
        } else {
            return of();
        }
    }
}