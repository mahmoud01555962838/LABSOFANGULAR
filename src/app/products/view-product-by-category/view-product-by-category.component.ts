import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { Category } from 'src/app/site-layout/category';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-view-product-by-category',
  templateUrl: './view-product-by-category.component.html',
  styleUrls: ['./view-product-by-category.component.css'],
})
export class ViewProductByCategoryComponent implements OnInit {
  searchCategory: Category;
  productList: any;
  searchText;
  cartProduct;
  loginUser;
  viewStatus: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartserviceService,
    private router: Router,
    private transloco: TranslocoService,
    private userService: UserDataService
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

    this.activatedRoute.params.subscribe((data: Params) => {
      this.searchCategory = data['id'];

      this.productService
        .searchCategoryProduct(this.searchCategory)
        .subscribe((categoryData) => {
          this.productList = categoryData;
        });
    });

    this.productService.search.subscribe((data: any) => {
      this.searchText = data;
    });

    this.loginUser = localStorage.getItem('user');

    this.productService.viewStatus.subscribe((status) => {
      this.viewStatus = status;
    });
  }

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
  onViewProduct(productId) {
    this.router.navigate(['/products/view-product/' + productId]);
  }
}
