import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile.component';


const routes: Routes = [{
  path: '',
  component: ProfileComponent,
  // children: [{
  //   path: 'login',
  //   component: SmartTableComponent,
  // }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }

export const routedComponents = [
  ProfileComponent,
  MapComponent,
  SearchComponent,
];
