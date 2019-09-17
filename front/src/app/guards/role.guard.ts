import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import * as JWT from 'jwt-decode';
import { AuthGuard } from './auth.guard';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthGuard, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const token = localStorage.getItem('token');

    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;

    // decode the token to get its payload
    const tokenPayload: any = token ? JWT(token) : null;

    if (
      !this.auth.canActivate()
      ||
      tokenPayload.roles[0] !== expectedRole
    ) {
      this.router.navigate(['landing']);
      return false;
    }
    
    return true;
  }
}

