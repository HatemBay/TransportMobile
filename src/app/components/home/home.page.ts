/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FeuilleRetourService } from 'src/app/services/feuille-retour.service';
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
  pickupsCount = 0;
  roadmapsCount = 0;
  retourmapsCount = 0;
  livraisonCount = 0;
  livreCount = 0;
  reporteCount = 0;
  annuleCount = 0;

  constructor(
    private auth: AuthenticationService,
    private pickupService: PickupService,
    private roadmapService: RoadmapService,
    private feuilleRetourService: FeuilleRetourService,
    private router: Router
  ) {
    this.userData = this.auth.getUserDetails();
    this.id = this.auth.getUserDetails()._id;
    console.log(this.userData._id);
  }

  async ngOnInit() {
    await this.countPickups(this.userData._id);
    await this.countLivraison();
    // await this.countStats();
    this.livraisonCount = this.roadmapsCount + this.retourmapsCount;
  }

  async countPickups(id: string) {
    const isAllocated = 'true';
    const isCollected = 'false';
    const isPicked = 'false';
    return this.pickupService
      .getPickups(id, isAllocated, isPicked, null, 'true')
      .subscribe((data) => {
        this.pickupsCount = data.length;
      });
  }

  async countLivraison() {
    await this.roadmapService
      .getRoadmaps(this.auth.getUserDetails()._id, null, 'true')
      .pipe(
        map((data) => {
          console.log('data');
          console.log(data.data);

          const allPackages = data.data.reduce(
            (acc, curVal) => acc.concat(curVal.packages),
            []
          );
          console.log('allPackages');
          console.log(allPackages);

          this.roadmapsCount = allPackages.filter(
            (item) => item.etat === 'en cours'
          ).length;
          this.livreCount += allPackages.filter(
            (item) =>
              item.etat === 'livré (chèque)' ||
              item.etat === 'livré (espèce)' ||
              item.etat === 'livré - payé - espèce' ||
              item.etat === 'livré - payé - chèque'
          ).length;
          this.reporteCount += allPackages.filter(
            (item) => item.etat === 'reporté'
          ).length;
          this.annuleCount = allPackages.filter(
            (item) => item.etat === 'annulé'
          ).length;
        })
      )
      .toPromise();
    await this.feuilleRetourService
      .getFeuilleRetours(this.auth.getUserDetails()._id, 'true')
      .pipe(
        map((data) => {
          const allPackages = data.data.reduce(
            (acc, curVal) => acc.concat(curVal.packages),
            []
          );
          this.retourmapsCount = allPackages.filter(
            (item) => item.etat === 'en cours de retour'
          ).length;
          this.annuleCount += allPackages.filter(
            (item) =>
              item.etat === 'en cours de retour' ||
              item.etat === 'retourné' ||
              // eslint-disable-next-line @typescript-eslint/quotes
              item.etat === "retourné à l'expediteur"
          ).length;
        })
      )
      .toPromise();
  }
  async countStats() {
    const isFinished = 'true';
    await this.roadmapService
      .getRoadmaps(this.auth.getUserDetails()._id, isFinished, 'true')
      .pipe(
        map((data) => {
          console.log('data');
          console.log(data.data);

          const allPackages = data.data.reduce(
            (acc, curVal) => acc.concat(curVal.packages),
            []
          );

          this.livreCount += allPackages.filter(
            (item) =>
              item.etat === 'livré (chèque)' ||
              item.etat === 'livré (espèce)' ||
              item.etat === 'livré - payé - espèce' ||
              item.etat === 'livré - payé - chèque'
          ).length;
          this.reporteCount += allPackages.filter(
            (item) => item.etat === 'reporté'
          ).length;
          this.annuleCount += allPackages.filter(
            (item) => item.etat === 'annulé'
          ).length;
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
