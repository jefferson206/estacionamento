import { ContainerComponent } from './components/container/container.component';
import { SharedPrimengModule } from './shared-primeng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedLibsModule } from './shared-libs.module';
import { FormMessageErroComponent } from './components/form/form-message-erro/form-message-erro.component';


@NgModule({
  declarations: [
    ContainerComponent,
    FormMessageErroComponent,
  ],
  imports: [
    SharedLibsModule,
    SharedPrimengModule
  ],
  exports: [
    SharedLibsModule,
    SharedPrimengModule,
    ContainerComponent,
    FormMessageErroComponent
  ]
})
export class SharedCommonModule { }
