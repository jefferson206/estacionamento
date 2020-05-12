import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/home/dashboard.module')
            .then(mod => mod.DashboardModule)
    },
    {
        path: 'movimentacao',
        loadChildren: () => import('./features/cadastros/clientes/clientes.module')
            .then(mod => mod.ClientesModule)
    }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
