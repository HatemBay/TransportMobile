/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FeuilleRetourService } from 'src/app/services/feuille-retour.service';
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
  packageIds: any = [];

  constructor(
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private packageService: PackageService,
    private roadmapService: RoadmapService,
    private feuilleRetourService: FeuilleRetourService,
    private navController: NavController
  ) {
    console.log(this.etat);
  }

  ngOnInit() {
    this.reload();
  }

  async reload() {
    setTimeout(async () => {
      await this.getPackageIds();
      this.packages = [];
      for await (const id of this.packageIds) {
        await this.getPackage(id);
      }
      this.packagesCount = this.packages.length;
      console.log('sone');
    }, 500);
  }

  async getPackageIds() {
    await this.roadmapService
      .getRoadmaps(this.auth.getUserDetails()._id, null, 'true')
      .pipe(
        map((data) => {
          const packages = data.data.reduce(
            (acc, curVal) => acc.concat(curVal.packages),
            []
          );
          const ids = packages
            .filter((item) => {
              if (this.etat === 'livré') {
                return (
                  item.etat === 'livré (chèque)' ||
                  item.etat === 'livré (espèce)' ||
                  item.etat === 'livré - payé - espèce' ||
                  item.etat === 'livré - payé - chèque'
                );
              } else {
                return item.etat === this.etat;
              }
            })
            .map((item) => item._id);
          this.packageIds.push(...ids);
        })
      )
      .toPromise();
    if (this.etat === 'annulé') {
      await this.feuilleRetourService
        .getFeuilleRetours(this.auth.getUserDetails()._id, 'true')
        .pipe(
          map((data) => {
            const ids = data.data
              .reduce((acc, curVal) => acc.concat(curVal.packages), [])
              .filter(
                (item) =>
                  item.etat === 'en cours de retour' ||
                  item.etat === 'retourné' ||
                  // eslint-disable-next-line @typescript-eslint/quotes
                  item.etat === "retourné à l'expediteur"
              )
              .map((item) => item._id);
            this.packageIds.push(...ids);
          })
        )
        .toPromise();
    }
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

  redirect(cab) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        cab2: cab,
      },
    };
    console.log(navigationExtras.queryParams);

    this.router.navigate(['/detail/d'], navigationExtras);
  }

  back() {
    this.navController.back();
  }
}
