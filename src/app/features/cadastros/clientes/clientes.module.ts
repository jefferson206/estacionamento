import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';

import { ClientesRoutingModule } from './clientes-routing.module';
import { CadastroClienteComponent } from './components/cadastro-cliente/cadastro-cliente.component';
import { ListaClienteComponent } from './components/lista-cliente/lista-cliente.component';

@NgModule({
  declarations: [
    CadastroClienteComponent,
    ListaClienteComponent
  ],
  imports: [
    SharedModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
