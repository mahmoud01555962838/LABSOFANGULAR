import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/products/product';
import { ProductService } from 'src/app/products/product.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css'],
})
export class UpdateproductComponent implements OnInit, BaseComponent {
  productId: number = 0;
  updateProductForm: FormGroup;
  productDetails: Product;
  isFormSubmitted = false;
  isFormValid = () => this.isFormSubmitted || !this.updateProductForm?.dirty; //for unsaved change alert
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //create reactive form and define validations
    this.updateProductForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      categoryId: new FormControl(null, [Validators.required]),

      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(15),
      ]),
      productImg: new FormControl(null, [Validators.required]),

      price: new FormControl(null, [Validators.required]),
    });

    this.activatedRoute.params.subscribe((data) => {
      //fetch data and submit changes based on incoming product id
      this.productId = data['id'];

      this.productService
        .viewProduct(this.productId)
        .subscribe((productData) => {
          this.productDetails = productData;

          this.updateProductForm.patchValue({
            //add the data from the database to the inputs as a default value
            name: this.productDetails.name,
            categoryId: this.productDetails.categoryId,
            productImg: this.productDetails.productImg,
            description: this.productDetails.description,
            price: this.productDetails.price,
          });
        });
    });
  }
  onSubmit() {
    this.isFormSubmitted = true; //for unsaved change alert
    //Process the data from the form and save it to the database
    const updateProduct = {
      name: this.updateProductForm.get('name').value,
      categoryId: this.updateProductForm.get('categoryId').value,
      productImg: this.updateProductForm.get('productImg').value,
      description: this.updateProductForm.get('description').value,
      price: Number(this.updateProductForm.get('price').value),
    };
    this.productService.delete.next(true); //RxJS subject trigger for snapshot

    this.productService
      .updateProduct(this.productId, updateProduct)
      .subscribe((data) => {
        console.log(data);
      });
    this.router.navigate(['/admindashboard/productlist']); //route after the process is complete
  }
}
