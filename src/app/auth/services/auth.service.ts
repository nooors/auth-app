import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { of, tap } from "rxjs";

import { environment } from "src/environments/environment";
import { AuthResponse, User } from "../interfaces/auth.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url: string = environment.BASE_URL;
  private _user!: User;

  get user() {
    return { ...this._user };
  }

  constructor(private httpSrv: HttpClient) {}

  login(email: string, password: string) {
    return this.httpSrv
      .post<AuthResponse>(`${this.url}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((resp) => {
          localStorage.setItem('token', resp.token!)
          if (resp.ok) {
            this._user = {
              name: resp.name!,
              uid: resp.uid!,
            };
          }
        }),
        map((resp) => resp.ok),
        catchError((err) => of(err.error.msg)),
      );
  }

  tokenValidate() {

    return this.httpSrv.get(`${this.url}/auth/renew`)

  }
}
