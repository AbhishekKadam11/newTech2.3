import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ProfileRoutingModule, routedComponents } from './profile-routing.module';
import { ProfileService } from './profile.service';
import { FileUploadModule } from 'ng2-file-upload';
import {AgmCoreModule} from "@agm/core";
//import { FancyImageUploaderModule } from 'ng2-fancy-image-uploader';
import { VerticalTimelineModule } from 'angular-vertical-timeline';

@NgModule({
  imports: [
    ThemeModule,
    ProfileRoutingModule,
    FileUploadModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCuRfFUi2K3aCdRDFG4ZDA_aGFwwDnhhaM',
      libraries: ['places'],
    }),
    VerticalTimelineModule,
   // FancyImageUploaderModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [ProfileService],

})
export class ProfileModule { }
