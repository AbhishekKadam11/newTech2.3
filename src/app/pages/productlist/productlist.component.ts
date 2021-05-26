import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../../app/@core/data/state.service';
import { ProductListService} from '../productlist/productlist.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Subscription } from 'rxjs/Subscription';
import { GlobalShared } from '../../app.global';
import { Apollo } from 'apollo-angular';
import { CREATE_LINK_MUTATION_SIGNUP, CreateLinkMutationResponse, PRODUCT_CATEGORY_WISE_LIST_QUERY } from '../../graphql';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'ngx-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss'],
})

export class ProductlistComponent implements OnInit, AfterViewInit {

  title: string;
  productType: string;
  public products: any;
  menu: any;
  public isRunning: boolean = true;

  @ViewChild(SidebarComponent) sidebar: SidebarComponent;
  protected productState$: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productListService: ProductListService,
              public globalShared: GlobalShared,
              private stateService: StateService,
              private cd: ChangeDetectorRef,
              private dashboardService: DashboardService,
              private apollo: Apollo ) {
    this.stateService.setSidebarState(this.stateService.sidebars[0]);

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productType = params['productType'];
    });
  }

  ngAfterViewInit() {
    this.apollo.watchQuery({
      query: PRODUCT_CATEGORY_WISE_LIST_QUERY,
      variables: {  category: this.productType,
                    brand: "" }
    }).valueChanges.subscribe((response) => {
      this.getProductBrandList(response['data']['productCategoryList']);
      if (response['data']['productCategoryList'].length !== 0) {
        this.productListService.productList(response);
        this.productListService.currentProducts.subscribe(data => {
          this.products = data;
          // console.log("data", data);
          if (this.products.length !== 0) {
            this.products.map(item => {
              this.dashboardService.getFile(item['image']).subscribe(result => {
                if (result) {
                  item['image'] = "data:image/jpg;base64," + result;
                }
              })
              return item;
            })
            // this.cd.detectChanges();
          }
        });
      }
    }, (error) => {
      console.log("test" + error);
    });
  }

  getProductBrandList(result) {
    let brands = this.getBrandname(result);
    let  title = result.length !=0 ? result[0]['category'] : null;
    this.sidebar.getmenus(brands, title);
    this.isRunning = false;
  }

  public getBrandname(products) {
    let brands = [];
    for ( let i = 0; i < products.length; i++ ) {
      if ( !(brands.indexOf(products[i]['brand']) > -1)) {
        brands.push(products[i]['brand']);
      }
    }
    return brands;
  }



  productDetails(productId) {
    this.router.navigate(['/pages/productdetails', productId ]);
  }





}
