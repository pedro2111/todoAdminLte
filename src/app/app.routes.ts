import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard } from './auth.guard';
import { RequisicaoComponent } from './components/requisicao/requisicao.component';
import { MudancaComponent } from './components/mudanca/mudanca.component';

export const ROUTES: Routes = [
    {path: '', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent , canActivate:[AuthGuard]},
    {path: 'requisicao', component: RequisicaoComponent , canActivate:[AuthGuard]},
    {path: 'mudanca', component: MudancaComponent , canActivate:[AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent}
]