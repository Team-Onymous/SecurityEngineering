/**
 * Created by bryan on 5-12-2018.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router, public userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    if(this.userService.isLoggedIn()) {
      let canActivate = this.userService.canActivate(state.url);
      if(!canActivate) {
        this.router.navigate(['login']);
      }
      return canActivate;
    }

    this.router.navigate(['login']);
    return false;
  }
}
