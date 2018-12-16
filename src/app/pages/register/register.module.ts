import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { RegisterRoutingModule, routedComponents } from './register-routing.module';
import { RegisterService } from './register.service';
// import { UserService } from './user.service';

@NgModule({
  imports: [
    ThemeModule,
    RegisterRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [RegisterService],

})
export class RegisterModule { }
