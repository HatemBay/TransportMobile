import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(
    private auth: AuthenticationService,
    private navController: NavController
  ) {}

  logout() {
    this.auth.logout();
  }

  back() {
    this.navController.back();
  }

  reload() {
    window.location.reload();
  }
}
