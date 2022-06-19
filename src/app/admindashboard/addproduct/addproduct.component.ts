import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/products/product.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit, BaseComponent {
  addProductForm: FormGroup;
  isFormSubmitted = false;
  isFormValid = () => this.isFormSubmitted || !this.addProductForm?.dirty; //for unsaved change alert

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    //create reactive form and define validations
    this.addProductForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      categoryId: new FormControl(null, [Validators.required]),

      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(15),
      ]),

      price: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.isFormSubmitted = true; //for unsaved change alert
    if (this.addProductForm.valid) {
      //get form values and create a product object to send database
      const newProduct = {
        name: this.addProductForm.get('name').value,
        categoryId: this.addProductForm.get('categoryId').value,
        description: this.addProductForm.get('description').value,
        price: Number(this.addProductForm.get('price').value),
        productImg: 'noproduct.jpg',
      };

      this.productService.createProduct(newProduct).subscribe((data) => {
        this.productService.delete.next(true); //RxJS subject trigger for snapshot
      });
      this.router.navigate(['admindashboard/productlist']); //route after the process is complete
    }
  }
}
