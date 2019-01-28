import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../../app/@core/data/state.service';
import { ProductListService} from '../productlist/productlist.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Subscription } from 'rxjs/Subscription';
import { GlobalShared } from '../../app.global';
import { Apollo } from 'apollo-angular';
import { CREATE_LINK_MUTATION_SIGNUP, CreateLinkMutationResponse, PRODUCT_CATEGORY_WISE_LIST_QUERY } from '../../graphql';

@Component({
  selector: 'ngx-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss'],
})

export class ProductlistComponent implements OnInit, AfterViewInit, OnDestroy {

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
              private apollo: Apollo ) {
    this.stateService.setSidebarState(this.stateService.sidebars[0]);

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productType = params['productType'];
    });

    this.productState$ = this.productListService.notifyObservable$.subscribe((result) => {
      this.products = {};
      if (result) {
        this.getFilteredProductList(result);
      }
    });
  }

  ngAfterViewInit() {
    // this.productState$ = this.productListService.productListData(this.productType)
    //   .subscribe((result) => {
    //     this.getProductList(result);
    //     console.log(result);
    //   });

    this.apollo.watchQuery({
      query: PRODUCT_CATEGORY_WISE_LIST_QUERY,
      variables: {  category: this.productType,
                    brand: "" }
    }).valueChanges.subscribe((response) => {
      this.getProductList(response['data']['productCategoryList']);
      console.log(response);
    }, (error) => {

      console.log("test" + error);
    });
  }

  getProductList(result) {
    this.products = result;
    let brands = this.getBrandname(result);
    this.sidebar.getmenus(brands, this.title);
    // if (result.hasOwnProperty('Motherboard')) {
    //   this.products = result['Motherboard'];
    //   this.title = 'Motherboard';
    //   let brands = this.getBrandname(result['Motherboard']);
    //   this.sidebar.getmenus(brands, this.title);
    // }
    // if (result.hasOwnProperty('Processor')) {
    //   this.products = result['Processor'];
    //   this.title = 'Processor';
    //   let brands = this.getBrandname(result['Processor']);
    //   this.sidebar.getmenus(brands, this.title);
    // }
    // if (result.hasOwnProperty('Graphic Card')) {
    //   this.products = result['Graphic Card'];
    //   this.title = 'Graphic Card';
    //   let brands = this.getBrandname(result['Graphic Card']);
    //   this.sidebar.getmenus(brands, this.title);
    // }
    // if (result.hasOwnProperty('Router')) {
    //   this.products = result['Router'];
    //   this.title = 'Router';
    //   let brands = this.getBrandname(result['Router']);
    //   this.sidebar.getmenus(brands, this.title);
    // }
    this.isRunning = false;
  }

  getFilteredProductList(result) {
    this.products = result;
    if (result.hasOwnProperty('Motherboard')) {
      this.products = result['Motherboard'];
    }
    if (result.hasOwnProperty('Processor')) {
      this.products = result['Processor'];
    }
    if (result.hasOwnProperty('Graphic Card')) {
      this.products = result['Graphic Card'];
    }
    if (result.hasOwnProperty('motherboard')) {
      this.products = result['motherboard'];
    }
    if (result.hasOwnProperty('Router')) {
      this.products = result['Router'];
    }
    this.isRunning = false;
  }

  productDetails(productId) {
    this.router.navigate(['/pages/productdetails', productId ]);
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

  ngOnDestroy() {
    this.productState$.unsubscribe();
  }

}
