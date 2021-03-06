import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng-lts/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  subscriptionTransaltion: Subscription;

  constructor(
    public translate: TranslateService,
    public primeNGConfig: PrimeNGConfig
  ) {
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');
    this.translate.use('es');
    this.subscriptionTransaltion = this.translate
      .stream('primeng')
      .subscribe((data) => {
        this.primeNGConfig.setTranslation(data);
      });
  }

  ngOnDestroy() {
    if (this.subscriptionTransaltion) {
      this.subscriptionTransaltion.unsubscribe();
    }
  }
  title = 'vision-latest-version';
}

//CODE TO GENERATE QR
//HTML

/* <h1>How to Generate QR Code in Angular? - ItSolutionStuff.com</h1>

<qrcode
  [qrdata]="'myAngularxQrCode'"
  [width]="50"
  [errorCorrectionLevel]="'M'"
></qrcode> */

// TS

//declaration
// public myAngularxQrCode: string = null;
// use
//    this.myAngularxQrCode = 'ItSoluionStuff.com';
