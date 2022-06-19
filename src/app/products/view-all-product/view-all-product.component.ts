import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-view-all-product',
  templateUrl: './view-all-product.component.html',
  styleUrls: ['./view-all-product.component.css'],
})
export class ViewAllProductComponent implements OnInit {
  productList: any;
  loginUser;
  cartProduct;
  userCart: [];
  searchText: string;
  viewStatus: boolean;

  constructor(
    private productService: ProductService,
    private cartService: CartserviceService,
    private userService: UserDataService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    //call observable method to list all products
    this.productService.viewAllProduct().subscribe((data) => {
      this.productList = data;
    });

    //subscribe data from search input for filtering and assign to variable
    this.productService.search.subscribe((data: any) => {
      this.searchText = data;
    });

    //assign user in local storage to variable
    this.loginUser = localStorage.getItem('user');

    //RxJs subject trigger for change page view
    this.productService.viewStatus.subscribe((status) => {
      this.viewStatus = status;
    });
    //RxJs subject trigger for hiding main sidebar and navbar
    this.userService.url.next(false);

    //RxJs subject trigger for change language
    this.userService.language.subscribe((data) => {
      if (data == true) {
        this.transloco.setActiveLang('tr');
      } else {
        this.transloco.setActiveLang('en');
      }
    });
  }

  //add product to cart
  addtoCart(productId) {
    this.productList.forEach((product) => {
      if (product.id == productId) {
        this.cartProduct = product;
      }
    });
    const userCart = {
      productId: this.cartProduct.id,
      name: this.cartProduct.name,
      categoryId: this.cartProduct.categoryId,
      description: this.cartProduct.description,
      price: this.cartProduct.price,
      productImg: this.cartProduct.productImg,
      userId: JSON.parse(this.loginUser).id,
    };
    this.cartService.addtoCart(userCart).subscribe((response) => {
      console.log(response);
      this.cartService.cartCount.next(true);
    });
  }

  //change the page view
  changeView() {
    if (this.viewStatus) {
      this.productService.viewStatus.next(false);
    } else {
      this.productService.viewStatus.next(true);
    }
  }
}
