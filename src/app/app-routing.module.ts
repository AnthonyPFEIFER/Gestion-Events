import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditComponent } from './components/credit/credit.component';
import { AuthGuard } from './guards/auth.guard';
import { AfterAuthGuard } from './guards/after-auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/agenda', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent , canActivate: [AfterAuthGuard]  },
  {
    path:'login',
    canActivate: [AfterAuthGuard],
    loadChildren: () => import('./components/authentication/authentication.module').then((m) => m.AuthenticationModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomeModule),
  },
  { path: 'page-not-found', component: PageNotFoundComponent},
  { path: 'credit', component: CreditComponent },
  { path: '**', component: PageNotFoundComponent},
];

/*@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})*/
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
