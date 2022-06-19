import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminguardService } from '../guards/adminguard.service';
import { CartComponent } from './cart/cart.component';
import { ViewAllProductComponent } from './view-all-product/view-all-product.component';
import { ViewProductByCategoryComponent } from './view-product-by-category/view-product-by-category.component';
import { ViewProductComponent } from './view-product/view-product.component';

const routes: Routes = [
  { path: '', component: ViewAllProductComponent },
  { path: 'view-product/:id', component: ViewProductComponent },
  {
    path: 'category/:id',
    component: ViewProductByCategoryComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
