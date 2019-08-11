import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from './pages/login/user.service';
import { GlobalShared } from './app.global';
import { CartService } from './pages/cart/cart.service';

import { GraphQLModule } from './apollo.config';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MglTimelineModule} from "angular-mgl-timeline";


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpModule,
    GraphQLModule,
    BrowserAnimationsModule,

    // SharedModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    UserService,
    CartService,
    GlobalShared,
  ],
})
export class AppModule {
}
// export function authHttpServiceFactory(backend: XHRBackend, options: RequestOptions) {
//   return new HttpClient(backend, options);
// }
