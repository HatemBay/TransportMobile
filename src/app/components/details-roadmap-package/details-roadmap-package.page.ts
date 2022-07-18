import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-details-roadmap-package',
  templateUrl: './details-roadmap-package.page.html',
  styleUrls: ['./details-roadmap-package.page.scss'],
})
export class DetailsRoadmapPackagePage implements OnInit {
  codeBarre = this.route.snapshot.paramMap.get('cab');
  codeBarre2 = this.route.snapshot.queryParamMap.get('cab2') || null;
  package: any = {};
  constructor(
    private route: ActivatedRoute,
    private packageService: PackageService,
    private navController: NavController
  ) {
    console.log(this.codeBarre);
    console.log('cab2 ' + this.codeBarre2);
  }

  async ngOnInit() {
    if (this.codeBarre2 && this.codeBarre2 !== null) {
      await this.getPackage(this.codeBarre2);
    } else {
      await this.getPackage(this.codeBarre);
    }
  }

  async getPackage(cab: string) {
    return await this.packageService
      .getFullPackageByCAB(cab)
      .pipe(
        map((data) => {
          console.log(data[0]);

          this.package = data[0];
        })
      )
      .toPromise();
  }

  changeState(state: string, element: any) {
    this.packageService
      .updatePackageByCAB(element, { etat: state })
      .subscribe(async () => {
        this.getPackage(this.codeBarre);
      });
  }


  back() {
    this.navController.back();
  }

}
