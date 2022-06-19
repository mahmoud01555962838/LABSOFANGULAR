import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  productID = 0;
  productData: Product;
  isAdmin: boolean = false;
  productList: any;
  loginUser;
  cartProduct;
  userCart: [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartserviceService,
    private router: Router,
    private userService: UserDataService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    //RxJs subject trigger for change language
    this.userService.language.subscribe((data) => {
      if (data == true) {
        this.transloco.setActiveLang('tr');
      } else {
        this.transloco.setActiveLang('en');
      }
    });

    //catch product id from page with params
    this.activatedRoute.params.subscribe((data) => {
      this.productID = data['id'];
    });

    //pull the product according to the incoming id and assign it to the variable
    this.productService.viewProduct(this.productID).subscribe((viewData) => {
      this.productData = viewData;
    });

    //call observable method to list all products
    this.productService.viewAllProduct().subscribe((data) => {
      this.productList = data;
    });

    this.loginUser = localStorage.getItem('user');
    //assign based on logged in user id
    if (JSON.parse(this.loginUser).id === 1) {
      this.isAdmin = true;
    }
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
    this.cartService.addtoCart(userCart).subscribe((response) => {});
  }

  //call observable method for item deletion
  deleteProduct(productId) {
    this.productService.deleteProduct(productId).subscribe((deletedData) => {
      this.router.navigate(['/products']);
    });
  }
}
