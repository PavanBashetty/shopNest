import { Component } from '@angular/core';
import { commonData, userLoginData, userSignUpData } from '../_interfaces/userCredentialsData';
import { ApiService } from '../_api/api.service';
import { UserAuthService } from '../_api/userAuth.service';
import { UserServices } from '../_services/user.service';
import { Router } from '@angular/router';
import { SellerAuthService } from '../_api/sellerAuth.service';
import { cart, product } from '../_interfaces/addProductData';

@Component({
  selector: 'app-user-authentication',
  templateUrl: './user-authentication.component.html',
  styleUrls: ['./user-authentication.component.scss']
})
export class UserAuthenticationComponent {

  showLoginOnly:boolean = true;
  authErrorMsg!:string;

  constructor(private apiService:ApiService, private userAuthService:UserAuthService, private userServices:UserServices, private router:Router, private sellerAuthService:SellerAuthService){}
  ngOnInit(){
    this.userAuthService.reloadUser();
    this.sellerAuthService.reloadSeller();
  }

  userSignUp(commonData:commonData){
    let newUserData: userSignUpData = {...commonData, userType:'user'}
    this.userAuthService.userSignUp(newUserData);
  }
  userLogin(userloginData:userLoginData){
    this.authErrorMsg = '';
    this.apiService.userLogin(userloginData).subscribe({
      next:(result:userSignUpData[])=>{
        if(result && result.length>0){
          this.userServices.storeUserId(result[0].id);
          localStorage.setItem('user', JSON.stringify(result));
          this.router.navigate(['userHome']);
          this.localCartToDB();
        }else{
          this.authErrorMsg = 'Email or password is incorrect!';
        }
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  openSignUpPage(){
    this.showLoginOnly = false;
  }
  backToLogin(){
    this.showLoginOnly = true;
  }

  localCartToDB(){
    let data = localStorage.getItem('localCart');
    let userId:string;
    let cartData:cart;
  

    if(data){
      let cartDataList:product[] = JSON.parse(data)
      this.userServices.userId$.subscribe({
        next:(data)=>{userId = data},
        error:()=>{userId= ''}
      })
      
      cartDataList.forEach((product:product, index)=>{
        cartData = {...product, 'productId':product.id, 'userId':userId}
        delete cartData.id;
        console.log(cartData)
        this.apiService.addToCart(cartData).subscribe({
          next:()=>{console.log('yes')},
          error:()=>{console.log('no')}
        })
        if(cartDataList.length === index+1){
          localStorage.removeItem('localCart');
        }
      })
    }

    setTimeout(()=>{
      let userForCartList = localStorage.getItem('user');
      if(userForCartList){
        this.apiService.getCartList(JSON.parse(userForCartList)[0].id)
      }
    },2000)
  }
}
