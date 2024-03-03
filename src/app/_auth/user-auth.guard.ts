import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserAuthService } from '../_api/userAuth.service';


@Injectable({
  providedIn:'root'
})
class PermissionService{

  constructor(private userAuthService:UserAuthService, private router:Router){}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    if(localStorage.getItem('user')){
      return true;
    }else if(localStorage.getItem('seller')){
      this.router.navigate(['sellerHome']);
      return false;
    }
    return this.userAuthService.isUserSignedUp
  }
}

export const userAuthGuard: CanActivateFn = (route, state) => {
  return inject(PermissionService).canActivate(route,state)
};
