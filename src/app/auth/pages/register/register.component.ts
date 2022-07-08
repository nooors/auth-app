import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

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

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {}

  processRegister() {
    console.log(this.registerForm.value);
    this.router.navigateByUrl("/dashboard");
  }
}
