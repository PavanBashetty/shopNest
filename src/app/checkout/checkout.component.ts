import { Component } from '@angular/core';
import { UserServices } from '../_services/user.service';
import { ApiService } from '../_api/api.service';
import { cart, orders, priceSummary } from '../_interfaces/addProductData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  userId!:string
  paymentMethods: string[] = ['SEPA','Debit card', 'Credit card', 'Coupans','Cash'];
  selectedPaymentMode:string = 'SEPA';
  userEmail!:string;
  totalPayment!:number;
  orderSuccessMessage:boolean = false;
  cartData!:cart[];
  priceSummary:priceSummary = {
    price:0,
    deliveryCharge:0,
    total:0
  }


  constructor(private userServices:UserServices, private apiService:ApiService, private router:Router){}
  ngOnInit(){
    this.userServices.userId$.subscribe({
      next:(data)=>{this.userId = data},
      error:(error)=>{console.log(error)}
    })

    this.apiService.getCartList(this.userId);

    let user = localStorage.getItem('user');
    if(user){
      this.userEmail = JSON.parse(user)[0].email;
    }

    this.apiService.currentUserCart(this.userId).subscribe({
      next:(data:cart[])=>{
        this.cartData = data;        
        let price = 0;
        data.forEach((item)=>{
          if(item.quantity){price = price + (+item.price * +item.quantity)}
        })
        this.priceSummary.price = price;
        this.priceSummary.deliveryCharge = price * 0.02;
        this.priceSummary.total = (this.priceSummary.price + this.priceSummary.deliveryCharge);
        this.totalPayment = this.priceSummary.total
      },
      error:(error)=>{console.log(error)}
    })    
  }

  orderNow(data:any){
    setTimeout(()=>{
      this.cartData.forEach((item)=>{
        if(item.id){this.apiService.postOrderDeleteCartItems(item.id)}
      })
    },600)
    let currentOrder:orders = {...data, 'userId':this.userId, 'totalPayment':this.totalPayment, 'paymentMethod':this.selectedPaymentMode};
    this.apiService.placeOrder(currentOrder).subscribe({
      next:()=>{
        this.orderSuccessMessage = true;
        setTimeout(()=>{
          this.router.navigate(['/userorderlist'])
        },2000)
      },
      error:()=>{console.log('Not success')}
    }) 
  }
}
