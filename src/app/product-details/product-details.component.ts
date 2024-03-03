import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cart, product } from '../_interfaces/addProductData';
import { ApiService } from '../_api/api.service';
import { UserAuthService } from '../_api/userAuth.service';
import { UserServices } from '../_services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  productId!:string;
  productData!:product;
  removeCart:boolean = false;
  productQuantity:number = 1

  userId!:string;
  cartId!:string;

  constructor(private route:ActivatedRoute, private apiService:ApiService, private userServices:UserServices, private router:Router){}

  ngOnInit(){
  
    //TO GET LOGGED USER'S IS
    this.userServices.userId$.subscribe({
      next:(id:string)=>{this.userId = id},
      error:(error)=>{console.log(error)}
    })

    //TO GET PRODUCT ID OF THE CURRENT PRODUCT
    this.route.paramMap.subscribe({
      next:(param)=>{this.productId = String(param.get('productid'))},
      error:(error)=>{console.log(error)}
    })

    //TO GET THE DETAILS OF THE PRODUCT
    this.getProductDetails();

    //To activate remove cart button wherever needed (for both before and after logging in) 
    this.activateRemoveCartBtn(); // runs when product detail page is opened
    this.apiService.cartDataEmit.subscribe({ //runs when a new product added into cart from product detail page
      next:()=>{
        this.activateRemoveCartBtn();
      },
      error:(error:any)=>{console.log(error)}
    })
    
    //TO GET THE NUMBER OF ITEMS IN THE CART FOR THE LOGGED USER
    this.apiService.getCartList(this.userId);
    
  }

  getProductDetails(){
    this.apiService.getProductDetail(this.productId).subscribe({
      next:(data)=>{this.productData=data},
      error:(error)=>{console.log(error)}
    })
  }

  handleQuantity(type:string){
    if(this.productQuantity<20 && type=='plus'){
      this.productQuantity++
    }else if(this.productQuantity>1 && type=='min'){
      this.productQuantity--
    }
  }

  addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        this.apiService.localAddToCart(this.productData);
      }else{        
        let cartData:cart = {...this.productData, 'userId':this.userId, 'productId':this.productData.id}
        delete cartData.id;
        this.apiService.addToCart(cartData).subscribe({
          next:()=>{
            this.apiService.getCartList(this.userId);
            this.removeCart = true;            
          },
          error:()=>{alert('Failed to add in cart.')}
        })
      }
    }
  }
  activateRemoveCartBtn(){
    let cartData = localStorage.getItem('localCart');
    if(this.productId && cartData){
      let items = JSON.parse(cartData);
      items = items.filter((item:product)=>this.productId == item.id)
      if(items.length){
        this.removeCart = true;
      }else{
        this.removeCart = false;
      }      
    }else{
      if(this.userId){
        this.apiService.getCartListWithoutEmit(this.userId).subscribe({
          next:(items)=>{
            items = items.filter((item:product)=>this.productId == item.productId)
            if(items.length){
              this.cartId = items[0].id;
              this.removeCart = true;
            }else{
              this.removeCart = false;
            }
          },
          error:(error)=>{console.log(error)}
        })         
      }     
    }
  }
  removeFromCart(productId:string){
    if(!localStorage.getItem('user')){
      this.apiService.localRemoveFromCart(productId);
      this.productQuantity = 1;
      let localCart = localStorage.getItem('localCart');
      if(localCart){
        let localCartInArray = JSON.parse(localCart);
        if(localCartInArray.length == 0){
          localStorage.removeItem('localCart');
        }
      }
    }else{
      this.apiService.postLoginremoveFromCart(this.cartId).subscribe({
        next:()=>{
          console.log('Deleted');
          this.apiService.getCartList(this.userId);
          this.removeCart = false;
        },
        error:(error)=>{console.log(error)}
      })
    }
  }

  buyNow(){
    if(!localStorage.getItem('user')){
      this.router.navigate(['/userAuthentication'])
    }else{
      this.addToCart();
      this.router.navigate(['/usercheckout'])
    }
  }
}
