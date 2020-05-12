import { ResolveFieldDataService } from './../../services/resolve-fieldset.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styles: []
})
export class TabelaComponent implements OnInit {

  @Input() cabecalho: string;
  @Input() dataKey: any;
  @Input() value: string;
  @Input() selection: string;
  @Input() colunas: any;
  @Output() button = new EventEmitter();
  @Output() opa = new EventEmitter();

  constructor(private resolveFields: ResolveFieldDataService) { }

  ngOnInit() {
  }

  onClick(event) {
    this.button.emit(event);
  }

  selected(event){
    console.log(event)
    this.opa.emit(event)
  }

}
