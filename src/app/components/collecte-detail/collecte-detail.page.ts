/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PickupService } from 'src/app/services/pickup.service';

@Component({
  selector: 'app-collecte-detail',
  templateUrl: './collecte-detail.page.html',
  styleUrls: ['./collecte-detail.page.scss'],
})
export class CollecteDetailPage implements OnInit {
  pickups: any[];
  pickupsCount: number;
  constructor(
    private auth: AuthenticationService,
    private pickupService: PickupService,
    private router: Router,
    private navController: NavController
  ) {
    console.log(this.auth.getUserDetails()._id);
  }

  ngOnInit() {
    this.getPickups();
  }
  reload(ev) {
    this.getPickups();
  }

  getPickups() {
    const isAllocated = 'true';
    const isCollected = 'false';
    const isPicked = 'false';
    this.pickupService
      .getPickups(
        this.auth.getUserDetails()._id,
        isAllocated,
        isPicked,
        isCollected,
        'true'
      )
      .subscribe((data) => {
        this.pickups = data.data;
        console.log(data.data);
        console.log('dd');

        this.pickupsCount = data.length;
      });
  }

  details(id) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        pickupId: id,
      },
    };
    console.log(navigationExtras.queryParams);

    this.router.navigate(['/collecte'], navigationExtras);
  }


  back() {
    this.navController.back();
  }

}
