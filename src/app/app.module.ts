import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SellerAuthenticationComponent } from './seller-authentication/seller-authentication.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DynamicAdComponent } from './home/dynamic-ad/dynamic-ad.component';
import { ApparelDiscountComponent } from './home/dynamic-ad/apparel-discount/apparel-discount.component';
import { SummerSaleComponent } from './home/dynamic-ad/summer-sale/summer-sale.component';
import { UserAuthenticationComponent } from './user-authentication/user-authentication.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProductDashboardComponent } from './user-home/product-dashboard/product-dashboard.component';
import { ProductWidgetComponent } from './user-home/product-dashboard/product-widget/product-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SellerAuthenticationComponent,
    PageNotFoundComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    ProductDetailsComponent,
    DynamicAdComponent,
    ApparelDiscountComponent,
    SummerSaleComponent,
    UserAuthenticationComponent,
    UserHomeComponent,
    CartPageComponent,
    CheckoutComponent,
    OrderListComponent,
    ProfilePageComponent,
    ProductDashboardComponent,
    ProductWidgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
