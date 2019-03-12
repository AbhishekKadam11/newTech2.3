import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {ProductlistRoutingModule, routedComponents} from './productlist-routing.module';
import {ProductListService} from './productlist.service';
// import { SidebarComponent } from '../sidebar/sidebar.component';
// import { SearchsidebarComponent} from "../searchsidebar/searchsidebar.component";
import {ImgFallbackModule} from 'ngx-img-fallback';
import {SidebarModule} from "../sidebar/sidebar.module";
// import {SearchsidebarModule} from "../searchsidebar/searchsidebar.module";

@NgModule({
  imports: [
    ThemeModule,
    ProductlistRoutingModule,
    ImgFallbackModule,
    SidebarModule
   // SearchsidebarModule
  ],
  declarations: [
    ...routedComponents,

    // SidebarComponent,
    // SearchsidebarComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [ProductListService],

})
export class ProductlistModule {
}
