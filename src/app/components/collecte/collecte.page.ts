/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PackageService } from 'src/app/services/package.service';
import { PickupService } from 'src/app/services/pickup.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-collecte',
  templateUrl: './collecte.page.html',
  styleUrls: ['./collecte.page.scss'],
})
export class CollectePage implements OnInit {
  pickupId: string;
  pickup: any = {};
  packages: Array<any> = [];
  ids: any[];
  data: any;

  constructor(
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private pickupService: PickupService,
    private packageService: PackageService,
    private barcodeScanner: BarcodeScanner,
    private navController: NavController
  ) {
    this.pickupId = this.route.snapshot.queryParamMap.get('pickupId');
    console.log(localStorage.getItem('mean-token'));

    console.log(this.pickupId);
  }

  async ngOnInit() {
    await this.getPickup();
    this.packages = [];
    for await (const pack of this.ids) {
      await this.getPackage(pack);
    }
    console.log(this.packages);
    this.checkPickupState();
    await this.getPickup();
  }

  checkPickupState() {
    let isCollected = true;
    let isPicked = true;
    //check if we have packages that were not collected or picked
    for (const item of this.packages) {
      console.log(item.etat);
      if (!(item.etat === 'ramassé par livreur' || item.etat === 'collecté')) {
        isPicked = false;
      }
      if (item.etat !== 'collecté') {
        isCollected = false;
      }
    }
    console.log(isPicked);

    //if all the packages are either collected or picked update pickup state
    if (isCollected === true || isPicked === true) {
      console.log('dssdqlkqdfslhdqsqfskhlqfslkjfqskgkhu');

      this.pickupService
        .updatePickup(this.pickupId, {
          isPicked,
          isCollected,
        })
        .subscribe((data) => {
          console.log('sdqsdqdsqsdqdsqsd');
          console.log(data);
        });
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

  async getPickup() {
    return await this.pickupService
      .getPickup(this.pickupId)
      .pipe(
        map((data) => {
          this.pickup = data[0];
          console.log(data[0].packages);

          this.ids = data[0].packages.map((item) => item._id);
        })
      )
      .toPromise();
  }
  updatePackageToPicked(codeBarre: any) {
    this.packageService
      .updatePackageByCAB(codeBarre, {
        etat: 'ramassé par livreur',
        userId: this.auth.getUserDetails()._id,
      })
      .subscribe(() => {
        this.ngOnInit();
      });
    // this.http.get('http://assets.jouri-express.com/api/set_colis_collecte.php?code_barre='+code_barre+'&id_driver='+this.id).subscribe();
    // document.getElementById('div_'+code_barre).remove();
  }
  updatePackageToCollected(codeBarre: any) {
    this.packageService
      .updatePackageByCAB(codeBarre, {
        etat: 'collecté',
        userId: this.auth.getUserDetails()._id,
      })
      .subscribe(() => {
        this.ngOnInit();
      });
    // this.http.get('http://assets.jouri-express.com/api/set_colis_collecte.php?code_barre='+code_barre+'&id_driver='+this.id).subscribe();
    // document.getElementById('div_'+code_barre).remove();
  }

  scan() {
    console.log('slm');
    this.data = null;

    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.data = barcodeData;
        console.log(this.data);
        // this.packageService.updatePackage(barcodeData);
        // this.http
        //   .get(
        //     'http://assets.jouri-express.com/api/set_colis_collecte.php?code_barre=' +
        //       barcodeData.text +
        //       '&id_driver=' +
        //       this.id
        //   )
        //   .subscribe();
        // document.getElementById('div_' + barcodeData.text).remove();
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  back() {
    this.navController.back();
  }
}
