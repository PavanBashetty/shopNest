import { Component } from '@angular/core';
import { ApiService } from '../_api/api.service';
import { UserServices } from '../_services/user.service';
import { userSignUpData } from '../_interfaces/userCredentialsData';
import { SellerServices } from '../_services/seller.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {


  userId!: string;
  sellerId!:string;
  personalDetails!:userSignUpData[];
  name!:string;
  email!:string;
  userType!:string

  totalOrderCount!:number;
  totalMoneySpent:number = 0;

  constructor(private apiService: ApiService, private userServices: UserServices, private sellerServices:SellerServices) { }
  
  ngOnInit() {
    //TO GET LOGGED USER'S IS
    this.userServices.userId$.subscribe({
      next: (id: string) => { this.userId = id },
      error: (error) => { console.log(error) }
    })

    this.sellerServices.sellerId$.subscribe({
      next:(id:string)=>{this.sellerId = id},
      error:(error)=>{console.log(error)}
    })

    //TO GET THE NUMBER OF ITEMS IN THE CART FOR THE LOGGED USER
    this.apiService.getCartList(this.userId);
    this.totalOrderInfo(this.userId);

    this.getPersonalDetails();    
  }

  getPersonalDetails(){
    if(localStorage.getItem('user')){
      this.apiService.personalDetailsUser(this.userId).subscribe({
        next:(data:userSignUpData[])=>{          
          this.personalDetails = data          
          this.name = this.personalDetails[0].name;
          this.email = this.personalDetails[0].email;
          this.userType = this.personalDetails[0].userType;
        },
        error:(error)=>{console.log(error)}
      })
    }else if(localStorage.getItem('seller')){
      this.apiService.personalDetailsSeller(this.sellerId).subscribe({
        next:(data:userSignUpData[])=>{          
          this.personalDetails = data
          this.name = this.personalDetails[0].name;
          this.email = this.personalDetails[0].email;
          this.userType = this.personalDetails[0].userType;
        },
        error:(error)=>{console.log(error)}
      })
    }
  }

  totalOrderInfo(userId:string){
    this.apiService.getOrderForUser(userId).subscribe({
      next:(data)=>{
        this.totalOrderCount = data.length;
        data.forEach((item)=>{          
          this.totalMoneySpent = this.totalMoneySpent + item.totalPayment
        })
      },
      error:(error)=>console.log(error)
      
    })
  }
}




