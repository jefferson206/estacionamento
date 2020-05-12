import { MovimentacaoGuard } from './resolvers/movimentacao.resolver';
import { CadastroClienteComponent } from './components/cadastro-cliente/cadastro-cliente.component';
import { ListaClienteComponent } from './components/lista-cliente/lista-cliente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListaClienteComponent
  }, 
  {
    path: 'novo',
    component: CadastroClienteComponent
  },
  {
    path: ':id', 
    component: CadastroClienteComponent,
    resolve: {
      movimentacaoResolver: MovimentacaoGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
