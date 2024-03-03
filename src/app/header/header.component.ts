import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SellerServices } from '../_services/seller.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../_api/api.service';
import { product } from '../_interfaces/addProductData';
import { UserServices } from '../_services/user.service';
import { userSignUpData } from '../_interfaces/userCredentialsData';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  menuType!:string;
  sellerName!:string;
  userName!:string;
  searchIcon = faSearch;

  searchedResult!:product[]

  cartItems:number = 0;


  //To get userName by calling an API
  userId!:string;
  APIName!:string;
  // APIsellerName!:string;
  APIpersonalDetails!:userSignUpData[];
  
  constructor(private router:Router, private sellerServices:SellerServices, private apiService:ApiService, private userServices:UserServices){}

  ngOnInit(){
    this.router.events.subscribe({
      next:(val:any)=>{
        if(val.url){
          if(localStorage.getItem('seller') && val.url.includes('seller')){
            this.menuType = 'seller';
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore);
            this.sellerServices.storeSellerId(sellerData[0].id);
            this.sellerName = sellerData[0].name;
          }else if(localStorage.getItem('user') && val.url.includes('user')){
            this.menuType = 'user';
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore);
            this.userServices.storeUserId(userData[0].id);
            this.userName = userData[0].name;
          }
          else{
            this.menuType = 'default';
          }
        }
      },
      error:(error)=>{console.log(error)}
    })
    this.getCartDataFromLocalStorage();
    this.apiService.cartDataEmit.subscribe({
      next:(cartItems:product[])=> {
        cartItems.length == 0 ? this.getCartDataFromLocalStorage() : this.cartItems = cartItems.length;
      },
      error:()=>{this.cartItems = 0}      
    })
    this.userServices.userId$.subscribe({
      next:(data)=>{this.userId = data}
    })
    // this.getName(this.userId);
  }

  getName(userId:string){
    if(localStorage.getItem('seller')){
      this.apiService.personalDetailsSeller(userId).subscribe({
        next:(data:userSignUpData[])=>{
          this.APIpersonalDetails = data;
          this.APIName = this.APIpersonalDetails[0].name;
        },
        error:(error)=>{console.log(error)}
      })
    }else if(localStorage.getItem('user')){
      this.apiService.personalDetailsUser(userId).subscribe({
        next:(data:userSignUpData[])=>{
          this.APIpersonalDetails = data;
          this.APIName = this.APIpersonalDetails[0].name;
        },
        error:(error)=>{console.log(error)}
      })
    }
  }


  sellerLogout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    this.apiService.cartDataEmit.emit([]);
  }

  getCartDataFromLocalStorage(){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }
  }


}
