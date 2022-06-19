import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/products/product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductlistComponent implements OnInit {
  productList: any;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProduct();
    //subscribe subject for snapshot
    this.productService.delete.subscribe((data) => {
      this.getAllProduct();
    });
  }
  //call observable method for item deletion
  deleteProduct(productId) {
    this.productService.deleteProduct(productId).subscribe((deletedData) => {
      this.productService.delete.next(true); //RxJS subject trigger for snapshot
    });
  }
  //call observable method to list products
  getAllProduct() {
    this.productService.viewAllProduct().subscribe((data) => {
      this.productList = data; //assign data from observable to variable
    });
  }
}
