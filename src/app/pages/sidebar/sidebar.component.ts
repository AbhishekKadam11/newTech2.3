import {AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation, EventEmitter, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/withLatestFrom';
import {ProductListService} from '../productlist/productlist.service';
import {ProductlistComponent} from '../productlist/productlist.component';
import { Apollo } from 'apollo-angular';
import {PRODUCT_CATEGORY_WISE_LIST_QUERY} from "../../graphql";


@Component({
   encapsulation: ViewEncapsulation.None,
  selector: 'ngx-sidebarmenues',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewInit, OnInit {

  title: string;
  productType: string;
  menu: any;
  brands;
  checkboxValue = {};
  private subscription: Subscription;
  protected productState$: Subscription;
  public products: any;
  public showBlade: boolean = true;

  constructor(
              private apollo: Apollo) {

  }

  ngAfterViewInit() {

  }

  ngOnInit() {

  }

  getmenus(brand, ptype) {

    this.brands = brand;
    this.productType = ptype;
  }

  brandChoice = [];
  selectedBrand(event, brand) {
    if (event.target.checked) {
      this.brandChoice.push(brand);
    } else {
      const index = this.brandChoice.indexOf(brand);
      this.brandChoice.splice(index, 1);
    }
    this.apollo.watchQuery({
      query: PRODUCT_CATEGORY_WISE_LIST_QUERY,
      variables: {  category: this.productType,
        brand: this.brandChoice.length > 0 ? this.brandChoice : null  }
    }).valueChanges.subscribe((response) => {
      console.log("sidebar " + JSON.stringify(response));
    //  this.products =  JSON.stringify(response);
  //    this.productListService.productList(response);
    }, (error) => {
      console.log("test" + error);
    });

  }


}
