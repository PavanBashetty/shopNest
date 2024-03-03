import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthenticationComponent } from './seller-authentication/seller-authentication.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './_auth/auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthenticationComponent } from './user-authentication/user-authentication.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { userAuthGuard } from './_auth/user-auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'sellerAuthentication', component:SellerAuthenticationComponent},
  {path:'sellerHome',component:SellerHomeComponent, canActivate:[authGuard]},
  {path:'sellerAddProduct', component:SellerAddProductComponent, canActivate:[authGuard]},
  {path:'productDetails/:productid', component:ProductDetailsComponent},
  {path:'userAuthentication', component: UserAuthenticationComponent},
  {
    path:'userHome', canActivate:[userAuthGuard],
    children:[
      {
        path:'',
        pathMatch:'full',
        component:UserHomeComponent
      },
      {
        path:'productDetail/:productid', 
        component:ProductDetailsComponent
      }
    ]
  },
  {path:'userCart',component:CartPageComponent},
  {path:'usercheckout', component:CheckoutComponent},
  {path:'userorderlist', component:OrderListComponent},
  {path:'userProfile', component:ProfilePageComponent},
  {path:'sellerProfile', component:ProfilePageComponent},
  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
