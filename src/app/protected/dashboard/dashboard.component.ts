import { Component } from "@angular/core";
import { Router } from "@angular/router";
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
  get user() {
    return this.authSrv.user;
  }

  constructor(private router: Router, private authSrv: AuthService) {}

  logout() {
    this.router.navigateByUrl("/auth/login");
  }
}
