import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProductlistRoutingModule, routedComponents } from './productlist-routing.module';
import { ProductListService } from './productlist.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ImgFallbackModule } from 'ngx-img-fallback';

@NgModule({
  imports: [
    ThemeModule,
    ProductlistRoutingModule,
    ImgFallbackModule,
  ],
  declarations: [
    ...routedComponents,
    SidebarComponent,
  ],
  providers: [ProductListService],

})
export class ProductlistModule { }
