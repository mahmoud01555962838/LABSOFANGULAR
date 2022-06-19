import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnsavedguardService } from '../guards/unsavedguard.service';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AdmindashboardComponent } from './admindashboard.component';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  {
    path: '',
    component: AdmindashboardComponent,
    children: [
      {
        path: '',
        component: ProductlistComponent,
      },
      {
        path: 'productlist',
        component: ProductlistComponent,
      },
      {
        path: 'userlist',
        component: UserlistComponent,
      },
      {
        path: 'categorylist',
        component: CategorylistComponent,
      },
      {
        path: 'addproduct',
        component: AddproductComponent,
        canDeactivate: [UnsavedguardService],
      },
      {
        path: 'updateproduct/:id',
        component: UpdateproductComponent,
        canDeactivate: [UnsavedguardService],
      },
    ],
  },
  { path: 'productlist', component: ProductlistComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmindashboardRoutingModule {}
