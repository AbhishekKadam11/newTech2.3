import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {CommonModule} from "@angular/common";
import {NbSidebarModule} from "@nebular/theme";
import {ThemeModule} from "../../@theme/theme.module";

@NgModule({
  imports: [
   CommonModule,
    NbSidebarModule,
    ThemeModule,
  ],
  declarations: [
    SidebarComponent
  ],
  exports: [
    SidebarComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})

export class SharedModule {}
