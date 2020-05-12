import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SwalService {
    private opcoesPadrao = {
        allowEnterKey: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        reverseButtons: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#218838',
    };

    constructor() {
    }

    public sucesso(msg: string, titulo: string = 'Sucesso!') {
        return this.executarSwal({
            title: titulo,
            text: msg,
            type: 'success'
        });
    }

    public deletarComConfirmacao(callbackAoDeletar: () => void) {
        return this.executarSwal({
            title: 'Você tem certeza?',
            text: 'Após deletar você não poderá reverter esta ação!',
            type: 'question',
            showCancelButton: true
        }).then(result => {
            if (result.value) {
                callbackAoDeletar();
                Swal.fire(
                    'Deletado!',
                    'O registro foi deletado com sucesso',
                    'success'
                );
            }
        });
    }

    public error(msg: string, titulo: string = 'Oops...'){
        return this.executarSwal({
            title: titulo,
            text: msg,
            type: 'error'
        });
    }

    private executarSwal(opcoes: SweetAlertOptions): Promise<SweetAlertResult> {
        const opcoesMescladas = {...this.opcoesPadrao, ...opcoes};
        return Swal.fire(opcoesMescladas);
    }
}