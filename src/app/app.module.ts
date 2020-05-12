import { SharedPrimengModule } from './shared/shared-primeng.module';
import { HttpClientModule } from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {AppRoutes} from './app.routes';
import {AppComponent} from './app.component';
import {AppMenuComponent, AppSubMenuComponent} from './app.menu.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';


@NgModule({
    imports: [
        BrowserModule,
        AppRoutes,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedPrimengModule
    ],
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppTopBarComponent,
        AppFooterComponent,
    ],
    providers: [
        {
            provide: LocationStrategy, 
            useClass: HashLocationStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
