import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import {
  TokenPayload,
  AuthenticationService,
} from 'src/app/services/authentication.service';
import { RoleGuard } from 'src/app/services/role.guard';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  credentials: TokenPayload = {
    email: '',
    password: '',
  };
  returnUrl: string;
  emailForm: FormGroup;
  hasError: boolean;
  errorMessage: string;

  constructor(
    public fb: FormBuilder,
    private auth: AuthenticationService,
    private navController: NavController,
    private router: Router
  ) {}

  ngOnInit(): void {
    //redirection if user is authenticated
    // if (this.auth.isLoggedIn()) {
    //   this.router.navigate(['/home']);
    // }
    console.log('check');
    this.emailForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  newPassword() {
    console.log(this.emailForm.get('email').value);
    this.errorMessage = '';
    this.auth
      .forgotPasswordUser({ email: this.emailForm.get('email').value })
      .subscribe(
        (res) => console.log('test'),
        (err) => {
          if (typeof err.error === 'string') {
            console.log(err.message);
            this.errorMessage = err.error;
          } else {
            const navigationExtras: NavigationExtras = {
              queryParams: {
                reset: 'true',
              },
            };
            console.log(navigationExtras.queryParams);
            this.router.navigate(['login'], navigationExtras);
          }
        }
      );
  }

  back() {
    this.navController.back();
  }
  // save changes in credentials
  private onEmailFormValueChange(data: any): void {
    this.credentials.email = data.email;
    this.credentials.password = data.password;
  }
}
