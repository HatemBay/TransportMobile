import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isAuthorized(route);
  }

  isAuthorized(route: ActivatedRouteSnapshot): boolean {
    const roles = ['admin'];
    const role = this.auth.getUserDetails().role;
    roles.push(role);
    // console.log(roles);

    const expectedRoles = route.data.expectedRoles;
    const rolesMatches = roles.findIndex(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      (role) => expectedRoles.indexOf(role) !== -1
    );

    return rolesMatches >= 0;
  }
}
