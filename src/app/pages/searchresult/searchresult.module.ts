import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { SearchresultRoutingModule, routedComponents } from './searchresult-routing.module';
import { SearchService } from './searchresult.service';
// import { NgUploaderModule } from 'ngx-uploader';
// import { FancyImageUploaderModule } from 'ng2-fancy-image-uploader';
import { SearchsidebarComponent } from '../searchsidebar/searchsidebar.component';
import { ImgFallbackModule } from 'ngx-img-fallback';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {SharedModule} from "../shared/sharedmodule";

@NgModule({
  imports: [
    ThemeModule,
    SearchresultRoutingModule,
    ImgFallbackModule,
    SharedModule,
  //  NgUploaderModule,
   // FancyImageUploaderModule,
  ],
  declarations: [
    ...routedComponents,
   // SidebarComponent,
  //  SearchsidebarComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [SearchService],

})
export class SearchresultModule { }
