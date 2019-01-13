import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { CheckoutRoutingModule, routedComponents } from './checkout-routing.module';
import { ImgFallbackModule } from 'ngx-img-fallback';


@NgModule({
  imports: [
    ThemeModule,
    CheckoutRoutingModule,
    ImgFallbackModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [],

})
export class CheckoutModule { }
