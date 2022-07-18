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
  reset = false;

  constructor(
    public fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {
    this.reset =
      JSON.parse(this.route.snapshot.queryParamMap.get('passReset')) || false;
    console.log(this.route.snapshot.url);

    console.log('reset');
    console.log(this.reset);
  }

  ngOnInit(): void {
    //redirection if user is authenticated
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
    console.log('check');
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.errorMessage = '';
    this.loginForm.valueChanges.subscribe((data) => {
      this.onLoginFormValueChange(data);
    });
  }

  login() {
    this.hasError = false;

    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigate(['/home']).then(
          () =>
            // eslint-disable-next-line @typescript-eslint/quotes
            (this.errorMessage = "Vous n'êtes pas autorisé dans ce compte")
        );
      },
      (err) => {
        this.hasError = true;
        if (err.error.indexOf('to be empty') !== -1) {
          if (err.error.indexOf('email') !== -1) {
            this.errorMessage = 'Veuillez insérer votre Email';
          }
          if (err.error.indexOf('password') !== -1) {
            this.errorMessage = 'Veuillez insérer votre mot de passe';
          }
        } else if (this.errorMessage.indexOf('must be a valid email') !== -1) {
          this.errorMessage = 'Email non valide';
        } else {
          this.errorMessage = err.error;
        }
        this.cdRef.detectChanges();
      }
    );
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  // save changes in credentials
  private onLoginFormValueChange(data: any): void {
    this.credentials.email = data.email;
    this.credentials.password = data.password;
  }
}
