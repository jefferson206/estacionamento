import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ContainerComponent } from './components/container/container.component';
import { SharedPrimengModule } from './shared-primeng.module';
import { SharedLibsModule } from './shared-libs.module';
import { TabelaComponent } from './components/tabela/tabela.component';
import { SharedCommonModule } from './shared-common.module';

@NgModule({
  imports: [
    SharedLibsModule,
    SharedCommonModule
],
declarations: [],
exports: [SharedCommonModule],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
