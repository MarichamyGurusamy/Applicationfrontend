import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../image-processing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  productDetails = [];

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  
  public getAllProducts(){
    this.productService.getAllproducts()
    .pipe(
      map((x: Product[],i)=> x.map((product:Product)=> this.imageProcessingService.createImages(product)))
    )
    .subscribe(
    (resp: Product[]) => {
     console.log(resp);
     this.productDetails=resp;
    }, (error: HttpErrorResponse) => {
     console.log(error);
    }
    );
   }

   showProductDetails(productId){
     this.router.navigate(['/productViewDetails', {productId: productId}]);
   }

}
