import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../_api/api.service';
import { SellerServices } from '../_services/seller.service';
import { product } from '../_interfaces/addProductData';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent {

  addProductMsg!:string;
  sellerId!:string;
  @ViewChild('addProduct',{static:false}) addProductForm!:NgForm;

  constructor(private apiService:ApiService, private sellerServices:SellerServices){}
  
  ngOnInit(){
    this.sellerServices.sellerId$.subscribe({
      next:(data)=>{this.sellerId = data},
      error:()=>this.sellerId = ''
    })
  }

  addNewProduct(data:any){
    let dataToSend:product = {...data, sellerId:this.sellerId};    
    this.apiService.addProduct(dataToSend).subscribe({
      next:()=>{
        this.addProductMsg = 'New product added successfully!!',
        setTimeout(()=>{this.addProductMsg = ''}, 2000)
        this.addProductForm.resetForm();
      },
      error:(error)=>{console.log(error)}
    })
  }  
}
