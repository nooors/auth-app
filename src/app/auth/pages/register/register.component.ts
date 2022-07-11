import { AuthService } from "src/app/auth/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

// 3rd party library for cool error message effetcts
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    name: ["Adolfo 1", [Validators.required, Validators.minLength(2)]],
    email: ["adolfo1@adolfo.com", [Validators.required, Validators.email]],
    password: ["123456", [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSrv: AuthService,
  ) {}

  ngOnInit(): void {}

  processRegister() {
    // Destructuring registerForm.value
    const { name, email, password } = this.registerForm.value;
    this.authSrv.register(name, email, password).subscribe((res) => {
      console.log(res);
      if (res === true) {
        Swal.fire(
          "Your account has been created",
          "log in with your email and password",
          "success",
        );
        this.router.navigateByUrl("/dashboard");
      } else {
        Swal.fire("error", res, "error");
      }
    });
    // console.log(this.registerForm.value);
  }
}
