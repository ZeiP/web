import { Component, OnInit } from '@angular/core';
import { Router }    from '@angular/router';
import { ApiService } from 'civx-angular2-shared';

@Component({
  selector: 'pydt-steam-return',
  templateUrl: './steamreturn.component.html'
})
export class SteamReturnComponent implements OnInit {
  private busy: Promise<any>;

  constructor(private api: ApiService, private router: Router) {
    // Do stuff
  }

  ngOnInit() {
    this.busy = this.api.validateSteamCredentials(window.location.search).then(() => {
      const returnUrl = localStorage.getItem('returnUrl');

      if (returnUrl) {
        localStorage.removeItem('returnUrl');
        window.location.pathname = returnUrl;
      } else {
        this.router.navigate(['/user/profile']);
      }
    });
  }
}
