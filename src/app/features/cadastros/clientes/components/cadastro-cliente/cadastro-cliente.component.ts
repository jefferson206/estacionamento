import { Movimentacao } from './../../models/cadastro.model';
import { Cores } from 'src/app/features/cadastros/clientes/enums/cores.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { MovimentacaoService } from 'src/app/features/cadastros/clientes/services/cadastro.service';
import { FormGroup, FormBuilder, AbstractControl, FormControl } from '@angular/forms';
import { camposFormularioCadastro } from './camposFormularioCadastro';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TabelaPrecoService } from '../../services/tabela-preco.service';
import { SwalService } from 'src/app/shared/services/swal.service';
import { Calendar } from 'primeng/primeng';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html'
})
export class CadastroClienteComponent implements OnInit {

	@ViewChild('fromCal', {static: false}) calendarFrom: Calendar;

	formulario: FormGroup;
	cores = [];
	selectedCar: string;
	selectedCpf: string;
	valor: number;
	movimentacaoCadastrado: any;

	get editando() {
		return Boolean(this.movimentacaoCadastrado);
	}

	constructor(private formBuilder: FormBuilder,
				private movimentacaoService: MovimentacaoService,
				private router: Router, 
				private activatedRoute: ActivatedRoute,
				private tabelaPrecoService: TabelaPrecoService,
				private swalService: SwalService) {
		this.cores = Object.values(Cores);
	}

	ngOnInit() {
		this.configurarFormulario();
	}

	configurarFormulario(){
		this.buildEnums();
		this.movimentacaoCadastrado = this.activatedRoute.snapshot.data['movimentacaoResolver'];
		this.formulario = camposFormularioCadastro(this.formBuilder);
		if(this.movimentacaoCadastrado) {
			this.formulario.patchValue(this.movimentacaoCadastrado);
		};
	}

	cadastrarMovimentacao(){
		this.valor = this.tabelaPrecoService.calcular(this.formulario.value);
		this.formulario.get('preco').setValue(this.valor);
		this.movimentacaoService.criar(this.formulario.value).subscribe( () => {
			this.swalService.sucesso('Cadastro realizado com sucesso.');
			this.voltar();
		});
	}

	atualizar(){
		this.valor = this.tabelaPrecoService.calcular(this.formulario.value);
		this.formulario.get('preco').setValue(this.valor);
		this.movimentacaoService.atualizarPorId(this.formulario.value).subscribe( () => {
			this.swalService.sucesso('Movimentação atualizada com sucesso');
				this.voltar();
		});
	}

	deletar(){
		this.swalService.deletarComConfirmacao( () => {
			this.movimentacaoService.deletar(this.formulario.value.id).subscribe()
		}).then(() => this.voltar());
	}

	validarData() {
		let final = new Date(this.formulario.value.movimentacao.dataFinal).toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"});
		let inicio = new Date(this.formulario.value.movimentacao.dataInicial).toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"});
		if(final < inicio){
			this.swalService.error('A data de Saída não pode ser menor que a data de Entrada', 'Data Inválida'); 
			this.calendarFrom.value = null;
    		this.calendarFrom.updateInputfield();
			this.formulario.value.movimentacao.dataFinal = null;
		}
	}

	obterControleDoCampo(campo: string): AbstractControl | FormControl {
		return this.formulario.get(campo);
	}

	private buildEnums() {
		this.cores = this.cores.map(el => {
			return { label: el, value: el };
		});
	}
	
	private voltar() {
		this.router.navigate(['/movimentacao']);
	}
	
}
