import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  public get login(): AbstractControl {
    return this.loginForm.controls.login;
  }

  public get password(): AbstractControl {
    return this.loginForm.controls.password;
  }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: [
        '',
        Validators.compose(
          [Validators.required, Validators.minLength(5)]
        )
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])
      ]
    });
  }

  public doLogin(): void {
    // Local persistence of user
    if (this.userService.authenticate(this.loginForm.value)) {
      // Road to home
      this.router.navigate(['home']);      
    } else {
      // TODO : some snackbar to keep user informed
      this.snackBar.open(
        'Sorry, your identification failed!',
        '',
        {
          duration: 2500,
          verticalPosition: 'top'
        }
      );
      this.login.setValue('');
      this.password.setValue('');
    }

  }
}
