/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PickupService } from 'src/app/services/pickup.service';
import { RoadmapService } from 'src/app/services/roadmap.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userData: any;
  id: string;
  pickupsCount: number;
  roadmapsCount: number;

  constructor(
    private auth: AuthenticationService,
    private pickupService: PickupService,
    private roadmapService: RoadmapService,
    private router: Router
  ) {
    this.userData = this.auth.getUserDetails();
    this.id = this.auth.getUserDetails()._id;
    // console.log(this.userData);
  }

  async ngOnInit() {
    await this.countPickups(this.userData._id);
    await this.countAllPackageIds();
  }

  async countPickups(id: string) {
    const isAllocated = 'true';
    const isCollected = 'false';
    return this.pickupService
      .getPickups(id, isAllocated, isCollected, 'true')
      .subscribe((data) => {
        this.pickupsCount = data.length;
      });
  }

  async countAllPackageIds() {
    const isFinished = 'false';
    return await this.roadmapService
      .getRoadmaps(this.auth.getUserDetails()._id, isFinished, 'true')
      .pipe(
        map((data) => {
          console.log('data');
          console.log(data.data);

          this.roadmapsCount = data.data
            .reduce((acc, curVal) => acc.concat(curVal.packages), [])
            .map((item) => item._id).length;
          console.log('length');
          console.log(this.roadmapsCount);
        })
      )
      .toPromise();
  }

  async getRoadmaps(id: string) {
    return await this.roadmapService
      .getRoadmaps(id, 'true')
      .pipe(
        map((data) => {
          console.log('data');
          console.log(data.data);
          this.roadmapsCount = data.length;
        })
      )
      .toPromise();
  }

  onClick() {
    this.router.navigate(['collecte-detail']);
  }
}
