import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { ProductService } from 'src/app/products/product.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean;
  isAdmin: boolean = true;
  public searchText!: string;
  loginUser;
  searchPlaceHolder;
  cartCount: number = 0;
  urlStatus: boolean;
  constructor(
    private userDataService: UserDataService,
    private router: Router,
    private productService: ProductService,
    private cartService: CartserviceService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    // subscribe to observable method to get data and assign to variable
    this.userDataService.login.subscribe((data) => {
      this.isUserLoggedIn = data;
    });

    this.userDataService.isAdmin.subscribe((data) => {
      this.isAdmin = data;
    });

    this.userDataService.url.subscribe((data) => {
      this.urlStatus = data;
    });

    this.cartService.cartCount.subscribe((res) => {
      this.addToCart();
    });

    this.cartService.cartCountMinus.subscribe((res) => {
      this.addToCart();
    });
  }

  // to log out and clear local storage
  onLogOut() {
    localStorage.removeItem('user');
    this.userDataService.login.next(false);
    this.router.navigate(['/login']);
  }

  // to move data in the search bar between components
  search(data: any) {
    this.searchText = (data.target as HTMLInputElement).value;
    this.productService.search.next(this.searchText);
  }

  //The method that checks the counter when the product is added to the cart
  addToCart() {
    this.cartService.getCarts().subscribe((cartData) => {
      let newCartCount = 0;
      cartData.forEach((cartElement) => {
        if (cartElement.userId == JSON.parse(localStorage.getItem('user')).id) {
          console.log(cartData.length);
          newCartCount++;
        }
      });
      this.cartCount = newCartCount;
    });
  }

  //Method that changes the selected language and triggers the subject depending on the button
  onTranslate() {
    if (this.transloco.getActiveLang() == 'en') {
      this.transloco.setActiveLang('tr');
      this.userDataService.language.next(true);
    } else {
      this.transloco.setActiveLang('en');
      this.userDataService.language.next(false);
    }
  }
}
