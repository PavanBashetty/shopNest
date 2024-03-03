import { Component } from '@angular/core';
import { commonData, userLoginData, userSignUpData } from '../_interfaces/userCredentialsData';
import { ApiService } from '../_api/api.service';
import { SellerAuthService } from '../_api/sellerAuth.service';
import { SellerServices } from '../_services/seller.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../_api/userAuth.service';

@Component({
  selector: 'app-seller-authentication',
  templateUrl: './seller-authentication.component.html',
  styleUrls: ['./seller-authentication.component.scss']
})
export class SellerAuthenticationComponent {

  showLoginOnly:boolean = false;
  authErrorMsg!:string;

  constructor(private sellerAuthService:SellerAuthService, private apiService:ApiService, private sellerServices:SellerServices, private router:Router, private userAuthService:UserAuthService){}

  ngOnInit(){
    this.sellerAuthService.reloadSeller();
    this.userAuthService.reloadUser();
  }

  signup(commonData:commonData){
    let newSellerData: userSignUpData = {...commonData, userType:'seller'};
    this.sellerAuthService.sellerSignUp(newSellerData);
  }

  openLoginPage(){
    this.showLoginOnly = true;
  }

  login(sellerLoginData:userLoginData){
    this.authErrorMsg = '';
    this.apiService.sellerLogin(sellerLoginData).subscribe({
      next:(result:userSignUpData[])=>{
        if(result && result.length>0){
          this.sellerServices.storeSellerId(result[0].id);
          localStorage.setItem('seller',JSON.stringify(result));
          this.router.navigate(['sellerHome'])
        }else{
          this.authErrorMsg = 'Email or password is incorrect!';
        }
      },
      error:(error)=>{console.log(error)}
    })
  }

  backToSignUp(){
    this.showLoginOnly = false;
  }
}
