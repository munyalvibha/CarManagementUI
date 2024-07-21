import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        email: ['', Validators.required]
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    var user = {
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      role: "User"
    };
    this.userService.register(user).subscribe((response) => {
      //Rajvi - add validation for password to contain one capital field, min 8 to max 12
      //Rajvi - add validation for email field to contain only email
      //Rajvi - if status 200 show account reggistered msg else show something went wrong message
      this.router.navigate(['/login']);
      this.signupForm.reset()
    });
  }
}
