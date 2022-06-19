import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { productGuardService } from './guards/productGuard.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeGuardService } from './guards/homeguard.service';
import { AdminguardService } from './guards/adminguard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
    canActivate: [productGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [HomeGuardService],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [HomeGuardService],
  },
  {
    path: 'admindashboard',
    loadChildren: () =>
      import('./admindashboard/admindashboard.module').then(
        (m) => m.AdmindashboardModule
      ),
    canActivate: [AdminguardService],
  },
  {
    path: '**',
    redirectTo: '/products',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
