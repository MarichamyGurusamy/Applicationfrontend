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

  pageNumber: number = 0;
  
  productDetails = [];

  showLoadButton = false;

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  
  public getAllProducts(){
    this.productService.getAllproducts(this.pageNumber)
    .pipe(
      map((x: Product[],i)=> x.map((product:Product)=> this.imageProcessingService.createImages(product)))
    )
    .subscribe(
    (resp: Product[]) => {
     console.log(resp);
     if(resp.length==8) {
      this.showLoadButton=true;
     }
     else{
      this.showLoadButton=false;
     }
     resp.forEach(p=> this.productDetails.push(p));
    }, (error: HttpErrorResponse) => {
     console.log(error);
    }
    );
   }

   public loadMoreProduct(){
     this.pageNumber = this.pageNumber+1; 
     this.getAllProducts();
   }

   showProductDetails(productId){
     this.router.navigate(['/productViewDetails', {productId: productId}]);
   }

}
