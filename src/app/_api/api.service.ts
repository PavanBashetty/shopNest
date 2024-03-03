import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { userLoginData, userSignUpData } from "../_interfaces/userCredentialsData";
import { cart, orders, product } from "../_interfaces/addProductData";

@Injectable({
    providedIn:'root'
})
export class ApiService{

    private apiURL:string = 'http://localhost:3000';
    cartDataEmit = new EventEmitter<product[] | []>();

    constructor(private http:HttpClient){}

    //For Seller
    //sellerSignUp(newSellerData:userSignUpData):Observable<any>{return this.http.post<any>(`${this.apiURL}/seller`,newSellerData);}    
    sellerLogin(sellerLoginData:userLoginData):Observable<userSignUpData[]>{
        return this.http.get<userSignUpData[]>(`${this.apiURL}/seller?email=${sellerLoginData.email}&password=${sellerLoginData.password}`)
    }
    addProduct(addProduct:product):Observable<any>{
        return this.http.post<any>(`${this.apiURL}/products`,addProduct)
    }
    getProductList(sellerId:string):Observable<product[]>{
        return this.http.get<product[]>(`${this.apiURL}/products?sellerId=${sellerId}`)
    }
    deleteProductAPI(productId:string):Observable<any>{
        return this.http.delete<any>(`${this.apiURL}/products/${productId}`)
    }
    editProductDetails(productId:string, editContent:any):Observable<any>{
        return this.http.patch<any>(`${this.apiURL}/products/${productId}`,editContent)
    }

    //For Products before login
    popularProducts():Observable<product[]>{
        return this.http.get<product[]>(`${this.apiURL}/products?_limit=3`)
    }
    trendyProducts():Observable<product[]>{
        return this.http.get<product[]>(`${this.apiURL}/products?_limit=8`)
    }
    searchProducts(searchString:string):Observable<product[]>{
        return this.http.get<product[]>(`${this.apiURL}/products?color=${searchString}`)
    }
    getProductDetail(productid:string):Observable<product>{
        return this.http.get<product>(`${this.apiURL}/products/${productid}`)
    }
    localAddToCart(data:product){
        let cartData = [];
        let localCart = localStorage.getItem('localCart');
        if(!localCart){
            localStorage.setItem('localCart', JSON.stringify([data]))
        }else{
            cartData = JSON.parse(localCart);
            cartData.push(data);
            localStorage.setItem('localCart',JSON.stringify(cartData))
        }
        this.cartDataEmit.emit(cartData);
    }
    localRemoveFromCart(productId:string){
        let cartData=localStorage.getItem('localCart');
        if(cartData){
            let items:product[] = JSON.parse(cartData);
            items = items.filter((item:product)=>item.id !== productId);
            localStorage.setItem('localCart',JSON.stringify(items));
            this.cartDataEmit.emit(items);
        }
    }

    //For user & products (after login)
    userLogin(userLoginData:userLoginData):Observable<userSignUpData[]>{
        return this.http.get<userSignUpData[]>(`${this.apiURL}/user?email=${userLoginData.email}&password=${userLoginData.password}`);
    }
    completeProductList():Observable<product[]>{
        return this.http.get<product[]>(`${this.apiURL}/products`);
    }
    addToCart(cartData:cart):Observable<any>{
        return this.http.post<any>(`${this.apiURL}/userCart`,cartData)
    }
    getCartList(userId:string){
        if(userId){
            this.http.get<product[]>(`${this.apiURL}/userCart?userId=${userId}`).subscribe({
                next:(result)=>{                
                    this.cartDataEmit.emit(result)},
                error:(error)=>{console.log(error)}
            })
        }      
    }
    getCartListWithoutEmit(userId:string):Observable<product[]>{
        return this.http.get<product[]>(`${this.apiURL}/userCart?userId=${userId}`)
    }
    postLoginremoveFromCart(cartId:string):Observable<any>{
        return this.http.delete<any>(`${this.apiURL}/userCart/${cartId}`)
    }
    currentUserCart(userId:string):Observable<cart[]>{
        return this.http.get<cart[]>(`${this.apiURL}/userCart?userId=${userId}`)
    }
    placeOrder(currentOrder:orders):Observable<any>{
        return this.http.post<any>(`${this.apiURL}/orders`,currentOrder)
    }
    getOrderForUser(userId:string):Observable<orders[]>{
        return this.http.get<orders[]>(`${this.apiURL}/orders?userId=${userId}`)
    }
    postOrderDeleteCartItems(cartId:string){
        this.http.delete(`${this.apiURL}/userCart/${cartId}`, {observe:'response'}).subscribe({
            next:(result)=>{
                if(result){
                    this.cartDataEmit.emit([])
                }
            },
            error:(error)=>{console.log(error)}
        })
    }
    personalDetailsUser(userId:string):Observable<userSignUpData[]>{
        return this.http.get<userSignUpData[]>(`${this.apiURL}/user?id=${userId}`)
    }
    personalDetailsSeller(userId:string):Observable<userSignUpData[]>{
        return this.http.get<userSignUpData[]>(`${this.apiURL}/seller?id=${userId}`)
    }
}