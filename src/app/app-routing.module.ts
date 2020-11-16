import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { InserisciComponent } from './inserisci/inserisci.component';
import { ScaricaComponent } from './scarica/scarica.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { InsertMemberComponent } from './insert-member/insert-member.component';
import { ManageMemberComponent } from './manage-member/manage-member.component';
import { PublicLibraryComponent } from './public-library/public-library.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'inserisci',
    component: InserisciComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'scarica',
    component: ScaricaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'catalogo',
    component: CatalogoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'catalogo-pubblico',
    component: CatalogoComponent
  },
  {
    path: 'ricerca',
    component: RicercaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ricerca-pubblica',
    component: RicercaComponent
  },
  {
    path: 'libreria-pubblica',
    component: PublicLibraryComponent
  },
  {
    path: 'inserisci-associato',
    component: InsertMemberComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gestisci-associato',
    component: ManageMemberComponent,
    canActivate: [AuthGuard]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: 'home', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
