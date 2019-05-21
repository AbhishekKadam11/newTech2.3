import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [ {
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  }, {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  }, {
    path: 'productdetails/:productId',
    loadChildren: './productdetails/productdetails.module#ProductDetailsModule',
  }, {
    path: 'productlist/:productType',
    loadChildren: './productlist/productlist.module#ProductlistModule',
  }, {
    path: 'profile',
    loadChildren: 'app/pages/profile/profile.module#ProfileModule',
  }, {
    path: 'review/:productId',
    loadChildren: './productreview/productreview.module#ProductreviewModule',
  }, {
    path: 'checkout',
    loadChildren: './checkout/checkout.module#CheckoutModule',
  },{
    path: 'searchresult/:searchkey',
    loadChildren: './searchresult/searchresult.module#SearchresultModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
