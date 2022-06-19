import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ProductService } from 'src/app/products/product.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { Category } from '../category';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  categoryList: Category;
  isUserLoggedIn: boolean;
  urlStatus: boolean;
  constructor(
    private productService: ProductService,
    private userDataService: UserDataService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    // subscribe to observable method to get data and assign to variable
    this.productService.getCategory().subscribe((data) => {
      this.categoryList = data;
    });

    this.userDataService.login.subscribe((data) => {
      this.isUserLoggedIn = data;
    });

    this.userDataService.url.subscribe((data) => {
      this.urlStatus = data;
    });

    //RxJs subject trigger for change language
    this.userDataService.language.subscribe((data) => {
      if (data == true) {
        this.transloco.setActiveLang('tr');
      } else {
        this.transloco.setActiveLang('en');
      }
    });
  }
}
