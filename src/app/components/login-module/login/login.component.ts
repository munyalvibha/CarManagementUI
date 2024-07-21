import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  decode: string
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  decodeToken(token: string) {
    try {
      this.decode = jwtDecode(token)
    } catch (error) {
      console.error('Error decoding JWT:', error.message);
    }
  }


  onSubmit() {
    if (this.loginForm.valid) {
      var user = this.loginForm.value;
      this.userService.login(user).subscribe((response: any) => {
        this.decodeToken(response.token)
        localStorage.setItem("token", response.token)
        response.role = this.userService.setCurrentUser(this.decode);
        if (response.role === 'Admin') {
          this.router.navigate(['/admin']);
        } else if (response.role === 'User') {
          this.router.navigate(['/user']);
        } else {
          this.router.navigate(['/']);
        }
        this.loginForm.reset();
      });
    }
  }
}

