import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmindashboardRoutingModule } from './admindashboard-routing.module';
import { AdmindashboardComponent } from './admindashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductsModule } from '../products/products.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    AdmindashboardComponent,
    ProductlistComponent,
    UserlistComponent,
    CategorylistComponent,
    AddproductComponent,
    UpdateproductComponent,
  ],
  imports: [
    CommonModule,
    AdmindashboardRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    ProductsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslocoModule,
  ],
})
export class AdmindashboardModule {}
