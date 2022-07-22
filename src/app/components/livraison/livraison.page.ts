/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FeuilleRetourService } from 'src/app/services/feuille-retour.service';
import { PackageService } from 'src/app/services/package.service';
import { RoadmapService } from 'src/app/services/roadmap.service';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.page.html',
  styleUrls: ['./livraison.page.scss'],
})
export class LivraisonPage implements OnInit {
  roadmaps: any[];
  returnmaps: any[];
  packages: any[];
  villes: any[];
  packageIds: any = [];
  roadmapsCount: number;
  constructor(
    private auth: AuthenticationService,
    private packageService: PackageService,
    private roadmapService: RoadmapService,
    private feuilleRetourService: FeuilleRetourService,
    private navController: NavController
  ) {}

  async ngOnInit(villeId?: string) {
    await this.getAllPackageIds();
    this.packages = [];
    console.log('first');
    console.log(this.packages);
    console.log(this.packageIds);
    for await (const id of this.packageIds) {
      await this.getPackage(id);
    }
    if (villeId) {
      this.packages = this.packages.filter((item) => item.villeId === villeId);
    } else {
      const villes = this.packages.map((item) => {
        return { ville: item.villec, id: item.villeId };
      });

      this.villes = [
        ...new Map(villes.map((item) => [item.ville, item])).values(),
      ];

      console.log(this.villes);
    }
    this.roadmapsCount = this.packages.length;
    console.log('second');
    console.log(this.packages);
  }

  updateRoadmapToFinished(id) {
    const isFinished = 'true';
    this.roadmapService
      .updateRoadmap(id, {
        isFinished,
      })
      .subscribe((data) => {
        console.log(data);
      });
    console.log(id);
    console.log('finished');
  }

  async getAllPackageIds() {
    this.packageIds = [];
    const isFinished = 'false';
    await this.roadmapService
      .getRoadmaps(this.auth.getUserDetails()._id, isFinished, 'true')
      .pipe(
        map((data) => {
          this.roadmaps = data.data;
          const ids = data.data
            .reduce((res, roadmap) => {
              const packages = roadmap.packages.filter(
                (item) => item.etat === 'en cours'
              );
              console.log('reduced and filtered');
              console.log(packages);
              //* (note): the code is still not perfect, there can be a very rare case that the admin can make a roadmap before the driver
              //* goes back to the list and update roadmaps or if the driver directly goes to the home page
              //* so the best way is to optimise the roadmap directly after package modification by looking for the roadmap that contains it
              //* and testing if it's finished.
              //if all packages in a roadmap don't have state 'en cours' then give the roadmap state: 'is finished
              if (packages.length === 0) {
                this.updateRoadmapToFinished(roadmap._id);
              }
              return res.concat(packages);
            }, [])
            .map((item) => item._id);
          // console.log(typeof this.packageIds);
          // console.log(ids);
          this.packageIds.push(...ids);
        })
      )
      .toPromise();
    await this.feuilleRetourService
      .getFeuilleRetours(this.auth.getUserDetails()._id, 'true')
      .pipe(
        map((data) => {
          this.returnmaps = data.data;
          const ids = this.returnmaps
            .reduce((acc, curVal) => acc.concat(curVal.packages), [])
            .filter((item) => item.etat === 'en cours de retour')
            .map((item) => item._id);
          console.log(typeof ids);
          console.log(ids);
          this.packageIds.push(...ids);
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

  onChange(value) {
    this.ngOnInit(value);
  }

  back() {
    this.navController.back();
  }
}
