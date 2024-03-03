import { Component, EventEmitter } from '@angular/core';
import { cart, priceSummary, product } from '../_interfaces/addProductData';
import { ApiService } from '../_api/api.service';
import { UserServices } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {

  cartData!:cart[];
  userId!:string;
  priceSummary:priceSummary = {
    price:0,
    deliveryCharge:0,
    total:0
  }


  constructor(private apiService:ApiService, private userServices:UserServices, private router:Router){}
  ngOnInit(){
    this.userServices.userId$.subscribe({
      next:(data)=>{this.userId = data},
      error:(error)=>{console.log(error)}
    })

    this.getCartDataDetails();

    this.apiService.getCartList(this.userId);
  }

  getCartDataDetails(){
    this.apiService.currentUserCart(this.userId).subscribe({
      next:(data:cart[])=>{
        this.cartData = data;        
        let price = 0;

        // for(let i in data){          
        //   if(data[i].quantity){price = price + (+data[i].price * +data[i].quantity)}
        // }
        // this.priceSummary.price = price;
        // this.priceSummary.deliveryCharge = price * 0.02;
        // this.priceSummary.total = (this.priceSummary.price + this.priceSummary.deliveryCharge)        

        data.forEach((item)=>{
          if(item.quantity){price = price + (+item.price * +item.quantity)}
        })
        this.priceSummary.price = price;
        this.priceSummary.deliveryCharge = price * 0.02;
        this.priceSummary.total = (this.priceSummary.price + this.priceSummary.deliveryCharge)
      },
      error:(error)=>{console.log(error)}
    })
  }

  removeFromCart(cartId:string|undefined){
    if(cartId){
      this.apiService.postLoginremoveFromCart(cartId).subscribe({
        next:()=>{
          this.getCartDataDetails();
          this.apiService.getCartList(this.userId);
        },
        error:(error)=>{console.log(error)}
      })
    }
  }

  checkout(){
    this.router.navigate(['/usercheckout'])
  }
}
