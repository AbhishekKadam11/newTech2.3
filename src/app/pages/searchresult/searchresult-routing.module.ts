import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchresultComponent } from './searchresult.component';


const routes: Routes = [{
  path: '',
  component: SearchresultComponent,
  // children: [{
  //   path: 'login',
  //   component: SmartTableComponent,
  // }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchresultRoutingModule { }

export const routedComponents = [
  SearchresultComponent,

];
