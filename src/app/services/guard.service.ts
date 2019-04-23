import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, from } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private afAuth: AuthService, private router: Router) { }

  canActivate(router, state: RouterStateSnapshot): boolean {
    if(this.afAuth.authState !== undefined && this.afAuth.authState != null) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    // from(this.afAuth.authUser)
    //   .pipe(take(1))
    //   .pipe(map(authState => !!authState))
    //   .pipe(tap(authenticated => {
    //     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    //   }));
  }
}
