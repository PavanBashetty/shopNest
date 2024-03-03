import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";



@Injectable({providedIn:'root'})
export class SellerServices{


    //An observable to store Seller-ID
    private sellerIdSubject = new BehaviorSubject<string>('');
    public sellerId$ = this.sellerIdSubject.asObservable();
    storeSellerId(sellerId:string){
        this.sellerIdSubject.next(sellerId);
    }
}