import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProductreviewRoutingModule, routedComponents } from './productreview-routing.module';
import { ProductreviewService } from './productreview.service';
// import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProductDetailsService } from '../productdetails/productdetails.service';
// import { CKEditorModule } from 'ng2-ckeditor';
import { ImgFallbackModule } from 'ngx-img-fallback';

@NgModule({
  imports: [
    ThemeModule,
    ImgFallbackModule,
    ProductreviewRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [ProductreviewService,
              ProductDetailsService],

})
export class ProductreviewModule { }
