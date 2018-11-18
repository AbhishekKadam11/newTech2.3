import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { LoginRoutingModule, routedComponents } from './login-routing.module';
import { UserService } from './user.service';

@NgModule({
  imports: [
    ThemeModule,
    LoginRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  // providers: [
  //   SmartTableService,
  // ],
})
export class LoginModule { }
