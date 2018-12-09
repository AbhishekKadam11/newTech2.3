import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductdetailsComponent } from './productdetails.component';


const routes: Routes = [{
  path: '',
  component: ProductdetailsComponent,
  // children: [{
  //   path: 'login',
  //   component: SmartTableComponent,
  // }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }

export const routedComponents = [
  ProductdetailsComponent,

];
