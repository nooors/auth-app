import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: ["adolfo1@adolfo.com", [Validators.required, Validators.email]],
    password: ["123456", [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private httSrv: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  processForm() {
    console.log(this.loginForm.value);
    const { email, password } = this.loginForm.value;

    this.httSrv.login(email, password).subscribe((response) => {
      console.log(response);
      if (response === true) {
        this.router.navigateByUrl("/dashboard");
      } else {
        Swal.fire("Error", response, "error");
      }
    });
  }
}
