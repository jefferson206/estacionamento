import { Validators } from '@angular/forms';

export const camposFormularioCadastro = formBuilder => {
    return formBuilder.group({
        id: [null],
		nome: [null, [Validators.required]],
		sobrenome: [null, [Validators.required]],
		cpf: [null, [Validators.required, Validators.maxLength(14)]],
		telefone: [null, [Validators.required, Validators.maxLength(11)]],
		nascimento: [null],
		veiculo: formBuilder.group({
			marca: [null, [Validators.required]],
			cor: [null],
			modelo: [null, [Validators.required]],
			placa: [null, [Validators.required]],
			observacoes: [null]
		}),
		movimentacao: formBuilder.group({
			dataInicial: [null, [Validators.required]],
			dataFinal: [null]
		}),
		preco: [null]
    })
}