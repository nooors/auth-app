import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TokenValidateGuard } from "./guards/token-validate.guard";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./protected/protected.module").then((m) => m.ProtectedModule),
      canLoad: [TokenValidateGuard],
      canActivate: [TokenValidateGuard]
  },
  {
    path: "**",
    redirectTo: "auth",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
