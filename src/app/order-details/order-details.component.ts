import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {


  displayedColumns: string[] = ['Id', 'Product Name', 'Name', 'Address', 'Contact No.', 'Status', 'Action'];
  dataSource = [];
  constructor(private productServie: ProductService) { }

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin();
  }

  getAllOrderDetailsForAdmin(){
    this.productServie.getAllOrderDetailsForAdmin().subscribe(
     
      (resp) => {
        console.log(resp);
        this.dataSource=resp;
      },(error) =>{
        console.log(error);
      }

    );
  }

  markAsDelivered(orderId){
    console.log(orderId);
    this.productServie.markAsDelivered(orderId).subscribe(
     
      (response) =>{
        this,this.getAllOrderDetailsForAdmin();
        console.log(response);
      },
      (error) =>{
        console.log(error);
      }

    );
  }
}
