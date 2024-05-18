import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {AuthService} from "../../../shared/services/auth.service";
import {User} from "../../../shared/models/User";
import {UserService} from "../../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder,
              private authService: AuthService, private userService: UserService){
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required]
    });
  }

  register() {
    let email: string = this.registerForm.get('email')?.value;
    let password1: string = this.registerForm.get('password1')?.value;
    let password2: string = this.registerForm.get('password2')?.value;

    if (password1 !== password2){
      console.log("Nem megeggyező jelszavak!");
      return;
    }

    this.authService.register(email, password1).then(credentials => {
      console.log(credentials);
      const user: User = {
        id: credentials.user?.uid as string,
        email: this.registerForm.get('email')?.value
      };
      this.userService.create(user).then(_ => {
        console.log("User added successfully!");
        this.router.navigateByUrl('/home');
      }).catch(error => {
        console.error(error);
      })
    }).catch(error => {
      console.error(error);
    });
  }
}
