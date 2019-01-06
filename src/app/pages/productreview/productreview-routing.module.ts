import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductreviewComponent } from './productreview.component';


const routes: Routes = [{
  path: '',
  component: ProductreviewComponent,
  // children: [{
  //   path: 'login',
  //   component: SmartTableComponent,
  // }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductreviewRoutingModule { }

export const routedComponents = [
  ProductreviewComponent,

];
