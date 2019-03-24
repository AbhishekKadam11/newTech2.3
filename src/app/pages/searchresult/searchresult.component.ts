import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService} from '../searchresult/searchresult.service';
import { GlobalShared } from '../../app.global';
import { Apollo } from 'apollo-angular';
import {SEARCH_ITEM, CreateLinkMutationResponse, PRODUCT_DESCRIPTION} from '../../graphql';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {ProductListService} from "../productlist/productlist.service";

@Component({
  selector: 'ngx-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss'],
})
export class SearchresultComponent implements OnInit {

  searchkey;
  products: any;
  errorMessage: string;
  productType: any = {'All': true};

  @ViewChild(SidebarComponent) sidebar: SidebarComponent;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public globalShared: GlobalShared,
              private apollo: Apollo,
              private productListService: ProductListService,
              private searchService: SearchService) {

  }

  keys: String[];
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.searchkey = params['searchkey'];
      this.apollo.watchQuery({
        query: SEARCH_ITEM,
        variables: { searchKey: this.searchkey,
                     category: ""}
      }).valueChanges.subscribe((response) => {
        let data = response['data']['searchItem'];
        this.products = data;
          for (const value of this.products) {
            this.productType[value['category']] = false;
          }
        this.productListService.productList(response);
        this.getProductBrandList(response['data']['searchItem']);
       //   console.log(data);
      }, (error) => {
        console.log("product search api " + error);
      });
    });
  }

  getProductBrandList(result) {
    let brands = this.getBrandname(result);
    let  title = result.length !=0 ? result[0]['category'] : null;
    this.sidebar.getmenus(brands, title);
    //this.isRunning = false;
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
  // filterProducts(event, category) {
  //
  //   if ((this.userChoice.length) >=  0 ) {
  //     this.productType['All'] = false;
  //   }
  //
  //   if (event.target.checked) {
  //    // this.userChoice.push(category);
  //     if(this.userChoice.indexOf(category) == -1) {
  //       this.userChoice.push(category);
  //     }
  //   } else {
  //     const index = this.userChoice.indexOf(category);
  //     this.userChoice.splice(index, 1);
  //   }
  //
  //   if (category === 'All' && event.target.checked) {
  //     for (const value in this.productType) {
  //       this.productType[value] = true;
  //     }
  //     this.userChoice = [];
  //   }
  //
  //  // console.log(this.userChoice);
  //   this.apollo.watchQuery({
  //     query: SEARCH_ITEM,
  //     variables: { searchKey: this.searchkey,
  //                  category:  this.userChoice.length > 0 ? this.userChoice : ""}
  //   }).valueChanges.subscribe((response) => {
  //     let data = response['data']['searchItem'];
  //     this.products = data;
  //     for (const value of this.products) {
  //       this.productType[value['category']] = false;
  //     }
  //     console.log(data);
  //   }, (error) => {
  //     console.log("product search api " + error);
  //   });
  //
  // }

  productDetails(productId) {
    this.router.navigate(['/pages/productdetails', productId ]);
  }

}
