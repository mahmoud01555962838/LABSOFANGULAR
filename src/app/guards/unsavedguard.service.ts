import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AddproductComponent } from '../admindashboard/addproduct/addproduct.component';
import { BaseComponent } from '../admindashboard/base.component';

@Injectable({
  providedIn: 'root',
})
export class UnsavedguardService implements CanDeactivate<BaseComponent> {
  constructor() {}
  canDeactivate(
    component: BaseComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return component.isFormValid() //don't allow route and show error message if unsaved change
      ? true
      : window.confirm('You have unsaved changes. Leave?');
  }
}
