import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AuthenticationService,
  TokenPayload,
} from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: TokenPayload = {
    email: '',
    password: '',
  };
  returnUrl: string;
  loginForm: FormGroup;
  hasError: boolean;
  errorMessage: string;

  constructor(
    public fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    //redirection if user is authenticated
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.errorMessage = '';
    this.loginForm.valueChanges.subscribe((data) => {
      console.log('det');
      this.onLoginFormValueChange(data);
    });
  }

  login() {
    this.hasError = false;

    this.auth.login(this.credentials).subscribe(
      () => {
        console.log('success');
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        this.hasError = true;
        this.errorMessage = err.error;
        this.cdRef.detectChanges();
        console.error(err);
      }
    );
  }

  // save changes in credentials
  private onLoginFormValueChange(data: any): void {
    console.log('d');

    this.credentials.email = data.email;
    this.credentials.password = data.password;
  }
}
