import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartserviceService {
  cartCount = new Subject<boolean>();
  cartCountMinus = new Subject<boolean>();
  constructor(private httpClient: HttpClient) {}

  //created observable method to add Product to cart
  addtoCart(cart) {
    return this.httpClient.post('http://localhost:3000/carts/', cart);
  }

  // created observable method to show products in cart
  getCarts() {
    return this.httpClient.get('http://localhost:3000/carts/').pipe(
      map((response) => {
        const newArray = [];
        for (let key in response) {
          if (response.hasOwnProperty(key)) {
            newArray.push(response[key]);
          }
        }
        return newArray;
      })
    );
  }
  // created observable method to delete products in cart
  deleteCartItem(cartItemId) {
    const baseUrl = 'http://localhost:3000/carts/' + cartItemId;
    return this.httpClient.delete(baseUrl);
  }
  // created observable method to buy items in cart
  addToOrderList(order) {
    return this.httpClient.post('http://localhost:3000/orders/', order);
  }
}
