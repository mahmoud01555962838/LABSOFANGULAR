import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';

import { ViewAllProductComponent } from './view-all-product/view-all-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewProductByCategoryComponent } from './view-product-by-category/view-product-by-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { FilterPipe } from '../shared/filter.pipe';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    ViewAllProductComponent,
    ViewProductComponent,
    ViewProductByCategoryComponent,
    CartComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslocoModule,
  ],
})
export class ProductsModule {}
