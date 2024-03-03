import { Component } from '@angular/core';
import { SellerAuthService } from '../_api/sellerAuth.service';
import { ApiService } from '../_api/api.service';
import { product } from '../_interfaces/addProductData';
import { UserAuthService } from '../_api/userAuth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  popularProducts!:product[];
  trendyProducts!:product[];
  constructor(private sellerAuthService:SellerAuthService, private apiService:ApiService, private userAuthService:UserAuthService){}

  ngOnInit(){
    this.sellerAuthService.reloadSeller();
    this.userAuthService.reloadUser();
    this.apiService.popularProducts().subscribe({
      next:(data)=>{this.popularProducts = data},
      error:(error)=>{console.log(error)}
    })

    this.apiService.trendyProducts().subscribe({
      next:(data)=>{this.trendyProducts = data},
      error:(error)=>{console.log(error)}
    })
  }


}
