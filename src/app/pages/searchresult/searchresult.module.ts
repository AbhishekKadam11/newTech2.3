import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { SearchresultRoutingModule, routedComponents } from './searchresult-routing.module';
import { SearchService } from './searchresult.service';
// import { NgUploaderModule } from 'ngx-uploader';
// import { FancyImageUploaderModule } from 'ng2-fancy-image-uploader';
// import { SidebarComponent } from '../sidebar/sidebar.component';
import { ImgFallbackModule } from 'ngx-img-fallback';

@NgModule({
  imports: [
    ThemeModule,
    SearchresultRoutingModule,
    ImgFallbackModule,
  //  NgUploaderModule,
   // FancyImageUploaderModule,
  ],
  declarations: [
    ...routedComponents,
 //   SidebarComponent,
  ],
  providers: [SearchService],

})
export class SearchresultModule { }
