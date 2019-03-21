import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {ProductlistModule} from "../productlist/productlist.module";
import {SearchresultModule} from "../searchresult/searchresult.module";
import {CommonModule} from "@angular/common";
import {NbSidebarModule} from "@nebular/theme";

@NgModule({
  imports: [
   CommonModule,
    NbSidebarModule
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
