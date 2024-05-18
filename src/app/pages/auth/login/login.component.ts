import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private auth: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async login() {
    let email: string = this.loginForm.get('email')?.value;
    let password: string = this.loginForm.get('password')?.value;

    this.auth.login(email, password).then(credentials => {
      this.router.navigate(['/home']);
    }).catch(error => {
      console.error(error);
    });
  }
}
