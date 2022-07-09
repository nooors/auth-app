import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { Observable, of, tap } from "rxjs";

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
          if (resp.ok) {
            localStorage.setItem('token', resp.token!)
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

  tokenValidate():Observable<boolean> {

    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.httpSrv.get<AuthResponse>(`${this.url}/auth/renew`, { headers })
      .pipe(
        map(resp => {

          return resp.ok
        }),
        catchError(err => of(false))
      )

  }
}
