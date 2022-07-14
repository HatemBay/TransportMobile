import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import {
  AuthenticationService,
  TokenPayload,
} from '../../services/authentication.service';
import { PackageService } from '../../services/package.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  returnUrl: string;
  loginForm: FormGroup;
  hasError: boolean;
  errorMessage: string;
  packageList = [];
  //private fields
  private token: string;
  constructor(private packageService: PackageService) {}
  ngOnInit(): void {
    this.packageService
      .getFullPackages()
      .pipe(
        map((data) => {
          this.packageList = data.data;
          console.log(data);
        })
      )
      .toPromise();
  }
}
