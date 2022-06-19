import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/products/product.service';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css'],
})
export class CategorylistComponent implements OnInit {
  categoryList: any;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    //subscribe observable method for listing
    this.productService.getCategory().subscribe((data) => {
      this.categoryList = data;
    });
  }
}
