import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ProfileRoutingModule, routedComponents } from './profile-routing.module';
import { ProfileService } from './profile.service';
import { FileUploadModule } from 'ng2-file-upload';
//import { FancyImageUploaderModule } from 'ng2-fancy-image-uploader';


@NgModule({
  imports: [
    ThemeModule,
    ProfileRoutingModule,
    FileUploadModule,
   // FancyImageUploaderModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [ProfileService],

})
export class ProfileModule { }
