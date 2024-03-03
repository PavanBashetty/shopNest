import { Component } from '@angular/core';
import { orders } from '../_interfaces/addProductData';
import { ApiService } from '../_api/api.service';
import { UserServices } from '../_services/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {

  orderData!:orders[]
  userId!:string;

  constructor(private apiService:ApiService, private userServices:UserServices){}

  ngOnInit(){
    this.userServices.userId$.subscribe({
      next:(data)=>{this.userId = data},
      error:(error)=>{console.log(error)}
    })

    this.getOrderList(this.userId);
  }


  getOrderList(userId:string){
    this.apiService.getOrderForUser(userId).subscribe({
      next:(data:orders[])=>{
        this.orderData = data;      
      },
      error:(error)=>{console.log(error)}
    })
  }
}
