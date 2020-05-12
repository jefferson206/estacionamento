import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styles: []
})
export class ContainerComponent {

  @Input() titulo: string;
  @Input() subTitulo: string;

  tituloTratado: string;

  constructor() {}

  ngOnInit() {
      this.aplicaEstiloNoTitutlo();
  }

  private aplicaEstiloNoTitutlo() {
      const tituloArray = this.titulo.split(' ');
      let tituloTemp = '';
      tituloArray.map((item, index) => {
          if (index + 1 === tituloArray.length) {
              tituloTemp += `<strong>${item}</strong>`;
          } else {
              tituloTemp += `${item} `;
          }
      });

      this.tituloTratado = tituloTemp;
  }

}
