import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
// import { SidebarRoutingModule, routedComponents } from './sidebar-routing.module';
import { SidebarService } from './sidebar.service';
import {SidebarComponent} from "./sidebar.component";


@NgModule({
  imports: [
    //ThemeModule,
    // SidebarRoutingModule,

  ],
  declarations: [
    SidebarComponent,

  ],
 // providers: [SidebarService],

})
export class SidebarModule { }
