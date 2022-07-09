import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Injectable } from '@angular/core';
import {  CanActivate, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TokenValidateGuard implements CanActivate, CanLoad {

  constructor(private authSrv: AuthService,
             private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    console.log('canActivate')
    return this.authSrv.tokenValidate()
      .pipe(
        tap(valid => {
          if (!valid) {
                this.router.navigateByUrl('/auth')
              }
              })
            );
  }
  canLoad(): Observable<boolean> | boolean {
    console.log('canLoad')
    return this.authSrv.tokenValidate();
  }
}
