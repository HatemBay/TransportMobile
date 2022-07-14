/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PackageService } from 'src/app/services/package.service';
import { RoadmapService } from 'src/app/services/roadmap.service';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.page.html',
  styleUrls: ['./livraison.page.scss'],
})
export class LivraisonPage implements OnInit {
  roadmaps: any[];
  packages: any[];
  packageIds: any[];
  roadmapsCount: number;
  constructor(
    private auth: AuthenticationService,
    private packageService: PackageService,
    private roadmapService: RoadmapService
  ) {}

  async ngOnInit() {
    await this.getAllPackageIds();
    this.packages = [];
    for await (const id of this.packageIds) {
      await this.getPackage(id);
    }
  }

  async getAllPackageIds() {
    const isFinished = 'false';
    return await this.roadmapService
      .getRoadmaps(this.auth.getUserDetails()._id, isFinished, 'true')
      .pipe(
        map((data) => {
          this.roadmaps = data.data;
          this.packageIds = this.roadmaps
            .reduce((acc, curVal) => acc.concat(curVal.packages), [])
            .map((item) => item._id);
          this.roadmapsCount = this.packageIds.length;
        })
      )
      .toPromise();
  }
  async getPackage(id: string) {
    return await this.packageService
      .getPackage(id)
      .pipe(
        map((data) => {
          this.packages.push(data[0]);
        })
      )
      .toPromise();
  }
  reload() {}
}
