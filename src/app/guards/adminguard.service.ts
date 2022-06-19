import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminguardService implements CanActivate {
  loginUser = localStorage.getItem('user');
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (JSON.parse(this.loginUser)?.isAdmin !== 1) {
      this.router.navigate(['/products']);
      return false; //don't allow routing if not admin
    } else {
      return true;
    }
  }
}
