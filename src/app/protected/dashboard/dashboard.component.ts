import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/auth/interfaces/auth.interface";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [
    `
      * {
        margin: 1.5rem;
      }
    `,
  ],
})
export class DashboardComponent {

  // user!: User;
  get user() {
    return this.authSrv.user
  }

  constructor(private router: Router, private authSrv: AuthService) {
    // this.user = this.authSrv.user;

  }

  logout() {
    this.authSrv.logout();
    this.router.navigateByUrl("/auth/login");
  }
}
