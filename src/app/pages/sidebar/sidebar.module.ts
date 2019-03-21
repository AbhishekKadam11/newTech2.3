import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
// import { SidebarRoutingModule, routedComponents } from './sidebar-routing.module';
import { SidebarService } from './sidebar.service';
import {SidebarComponent} from "./sidebar.component";
import {SharedModule} from "../shared/sharedmodule";
import {NbSidebarModule} from "@nebular/theme";


@NgModule({
  imports: [
    ThemeModule,
    // SidebarRoutingModule,
    SharedModule,
    NbSidebarModule,
  ],
  declarations: [
 //   SidebarComponent,

  ],

 // providers: [SidebarService],

})
export class SidebarModule { }
