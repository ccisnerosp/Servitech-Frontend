// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { TecnicosComponent } from './components/tecnicos/tecnicos.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { MenuadminComponent } from './components/menuadmin/menuadmin.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ServicerequestComponent } from './components/servicerequest/servicerequest.component';
import { ServicesdisplayComponent } from './components/servicesdisplay/servicesdisplay.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import {SignuptecnicoComponent} from './components/signuptecnico/signuptecnico.component';
import {MenutecnicoComponent} from './components/menutecnico/menutecnico.component';
import {ValoraciontecnicoComponent} from './components/valoraciontecnico/valoraciontecnico.component';
import {RendimientoserviciosComponent} from './components/rendimientoservicios/rendimientoservicios.component';
import {SignupconfirmComponent} from './components/signupconfirm/signupconfirm.component';
import {TecservicesComponent} from './components/tecservices/tecservices.component';
import {TecvaluationComponent} from './components/tecvaluation/tecvaluation.component';
import {TecservicerequestsComponent} from './components/tecservicerequests/tecservicerequests.component';
import {TecprofilemockupComponent} from './components/tecprofilemockup/tecprofilemockup.component';
import {ViewtecprofileComponent} from './components/viewtecprofile/viewtecprofile.component';
import {ClientprofileComponent} from './components/clientprofile/clientprofile.component';
import {ClientservicerequestsComponent} from './components/clientservicerequests/clientservicerequests.component';
import {ClientvaluationsComponent} from './components/clientvaluations/clientvaluations.component';
import {ClientpaymentComponent} from './components/clientpayment/clientpayment.component';
import {productGuard} from './security/product.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'clientes', component: ClientesComponent , canActivate:[productGuard]},
  { path: 'clientprofile/:id', component: ClientprofileComponent, canActivate:[productGuard]},
  { path: 'clientservicerequests/:id', component: ClientservicerequestsComponent, canActivate:[productGuard]},
  { path: 'clientvaluations/:id', component: ClientvaluationsComponent, canActivate:[productGuard]},
  { path: 'clientpayment/:id', component: ClientpaymentComponent, canActivate:[productGuard]},
  { path: 'tecnicos', component: TecnicosComponent , canActivate:[productGuard]},
  { path: 'tecservices/:id', component: TecservicesComponent, canActivate:[productGuard]},
  { path: 'tecservicerequests/:id', component: TecservicerequestsComponent, canActivate:[productGuard]},
  { path: 'tecprofilemockup/:id', component: TecprofilemockupComponent, canActivate:[productGuard]},
  { path: 'viewtecprofile/:id', component: ViewtecprofileComponent, canActivate:[productGuard]},
  { path: 'tecvaluation/:id', component: TecvaluationComponent, canActivate:[productGuard]},
  { path: 'usuarios', component: UsuariosComponent , canActivate:[productGuard]},
  { path: 'servicios', component: ServiciosComponent , canActivate:[productGuard]},
  { path: 'menuadmin', component: MenuadminComponent , canActivate:[productGuard]},
  { path: 'valoraciontecnico', component: ValoraciontecnicoComponent, canActivate:[productGuard]},
  { path: 'rendimientoservicios', component: RendimientoserviciosComponent, canActivate:[productGuard]},
  { path: 'menutecnico/:id', component: MenutecnicoComponent , canActivate:[productGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signupconfirm', component: SignupconfirmComponent},
  { path: 'signuptecnico/:id', component: SignuptecnicoComponent },
  { path: 'servicesdisplay/:id', component: ServicesdisplayComponent , canActivate:[productGuard]},
  { path: 'servicerequest/:serviceId/:clientId', component: ServicerequestComponent , canActivate:[productGuard]}

];



