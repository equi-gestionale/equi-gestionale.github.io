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

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
      path: 'login',
      component: LoginComponent
  },
  {
    path: 'inserisci',
    component: InserisciComponent
  },
  {
    path: 'scarica',
    component: ScaricaComponent
  },
  {
    path: 'catalogo',
    component: CatalogoComponent
  },
  {
    path: 'ricerca',
    component: RicercaComponent
  },
  {
    path: 'inserisci-associato',
    component: InsertMemberComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
