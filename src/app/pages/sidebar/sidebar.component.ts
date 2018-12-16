import {AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation, EventEmitter, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/withLatestFrom';
import {ProductListService} from '../productlist/productlist.service';
import {ProductlistComponent} from '../productlist/productlist.component';

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

  constructor(private productListService: ProductListService) {

  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    this.subscription = this.productListService.notifyObservable$.subscribe((res) => {
    });
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
    this.productListService.productListData(this.productType, this.brandChoice).subscribe((res) => {
      //console.log(res);
    });
  }


}
