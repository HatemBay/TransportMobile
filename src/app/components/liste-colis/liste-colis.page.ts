/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PackageService } from 'src/app/services/package.service';
import { RoadmapService } from 'src/app/services/roadmap.service';

@Component({
  selector: 'app-liste-colis',
  templateUrl: './liste-colis.page.html',
  styleUrls: ['./liste-colis.page.scss'],
})
export class ListeColisPage implements OnInit {
  etat = this.route.snapshot.paramMap.get('etat');
  packages: any[];
  packagesCount: number;
  packageIds: any[];

  constructor(
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private packageService: PackageService,
    private roadmapService: RoadmapService
  ) {
    console.log(this.etat);
  }

  async ngOnInit() {
    await this.getPackageIds();
    this.packages = [];
    for await (const id of this.packageIds) {
      await this.getPackage(id);
    }
    this.packagesCount = this.packages.length;
  }

  async getPackageIds() {
    const isFinished = 'false';
    return await this.roadmapService
      .getRoadmaps(this.auth.getUserDetails()._id, isFinished, 'true')
      .pipe(
        map((data) => {
          this.packageIds = data.data
            .reduce((acc, curVal) => acc.concat(curVal.packages), [])
            .filter((item) => {
              if (this.etat === 'livré') {
                return (
                  item.etat === 'livré (chèque)' ||
                  item.etat === 'livré (espèce)'
                );
              } else {
                return item.etat === this.etat;
              }
            })
            .map((item) => item._id);
          console.log(this.packageIds);
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

  redirect(cab) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        cab,
      },
    };
    console.log(navigationExtras.queryParams);

    this.router.navigate(['/detail/d'], navigationExtras);
  }
}
