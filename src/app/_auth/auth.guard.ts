import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { SellerAuthService } from '../_api/sellerAuth.service';

@Injectable({providedIn:'root'})
class PermissionService{

  constructor(private sellerAuthService:SellerAuthService, private router:Router){}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    if(localStorage.getItem('seller')){
      return true;
    }else if(localStorage.getItem('user')){
      this.router.navigate(['userHome'])
      return false;
    }
    return this.sellerAuthService.isSellerSignedUp;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(PermissionService).canActivate(route,state)
};