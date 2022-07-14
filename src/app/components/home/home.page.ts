/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PickupService } from 'src/app/services/pickup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userData: any;
  id: string;
  pickupsCount: number;

  constructor(
    private auth: AuthenticationService,
    private pickupService: PickupService,
    private router: Router
  ) {
    this.userData = this.auth.getUserDetails();
    this.id = this.auth.getUserDetails()._id;
    console.log(this.userData);
  }

  async ngOnInit() {
    await this.getPickups(this.userData._id);
  }

  async getPickups(id: string) {
    return this.pickupService
      .getPickups('true', 'false', null, null, null, null, 'true', id)
      .subscribe((data) => {
        console.log(data.data);
        this.pickupsCount = data.length;
      });
  }

  onClick() {
    this.router.navigate(['collecte-detail']);
  }
}
