import { Injectable, Type } from "@angular/core";
import { SummerSaleComponent } from "../home/dynamic-ad/summer-sale/summer-sale.component";
import { ApparelDiscountComponent } from "../home/dynamic-ad/apparel-discount/apparel-discount.component";



@Injectable({providedIn:'root'})
export class AdService{

    getAds(){
        return[
            {
                component: SummerSaleComponent,
                inputs:{item:'tablet', color:'black'}
            },
            {
                component: SummerSaleComponent,
                inputs:{item:'iphone', color:'white'}
            },
            {
                component: ApparelDiscountComponent,
                inputs:{type:'coat',color:'gray'}
            },
            {
                component: ApparelDiscountComponent,
                inputs:{type:'shoes', color:'black'}
            }
        ] as {component:Type<any>, inputs: Record<string, unknown>}[]
    }
}