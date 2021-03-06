import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ProfileRoutingModule, routedComponents } from './profile-routing.module';
import { ProfileService } from './profile.service';
import { FileUploadModule } from 'ng2-file-upload';
import {AgmCoreModule} from "@agm/core";
import {MglTimelineModule} from "angular-mgl-timeline";
//import { FancyImageUploaderModule } from 'ng2-fancy-image-uploader';
import { NgSelectModule } from "@ng-select/ng-select";
import { NbCardModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    ProfileRoutingModule,
    FileUploadModule,
    NgSelectModule,
    // NbCardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCuRfFUi2K3aCdRDFG4ZDA_aGFwwDnhhaM',
      libraries: ['places'],
    }),
    MglTimelineModule,
   // FancyImageUploaderModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [ProfileService],

})
export class ProfileModule { }
