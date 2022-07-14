import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private auth: AuthenticationService) {}

  logout() {
    this.auth.logout();
  }

  reload() {
    window.location.reload();
  }
}
