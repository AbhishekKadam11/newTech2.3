import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, Input, Directive, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductDetailsService } from './productdetails.service'
import { StateService } from '../../../app/@core/data/state.service';
import { CartService } from '../cart/cart.service';
import { NgxCarousel } from 'ngx-carousel';
import { GlobalShared } from '../../app.global';
import { Apollo } from 'apollo-angular';
import { PRODUCT_DESCRIPTION, CUSTOMERS_REVIEW, CreateLinkMutationResponse } from '../../graphql';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})

export class ProductdetailsComponent implements OnInit {

  productid: string;
  product: any = {};
  productReview: any = {};
  starRate: number = 4;
  brand;
  title;
  price;
  modalno;
  shortdescription;
  fulldescription;
  image;
  productimages;
  productData;
  public carouselTileItems: Array<any>;
  public carouselTile: NgxCarousel;
  recent: any = {};
  // defaultimage: string;
  // placeholder = 'assets/images/default-placeholder.png';

  constructor(private route: ActivatedRoute, private router: Router,
    private productdetailsaervice: ProductDetailsService,
    private stateService: StateService,
    private cdRef: ChangeDetectorRef,
    public globalShared: GlobalShared,
    private dashboardService: DashboardService,
    private apollo: Apollo,
    private cartService: CartService) {

    this.stateService.setSidebarState(this.stateService.sidebars[2]);

  }

  ngOnInit() {

    this.carouselTile = {
      grid: {xs: 2, sm: 2, md: 3, lg: 3, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: false,
      },
      load: 2,
      touch: true,
      easing: 'ease',
    };

    this.route.params.subscribe(params => {
      this.productid = params['productId'];
    });

    this.apollo.watchQuery({
      query: PRODUCT_DESCRIPTION,
      variables: { pid: this.productid }
    }).valueChanges.subscribe((response) => {
      let data = response['data']['getProductDescriptionData'];
      this.product['brand'] = data['data']['brand'];
      this.product['title'] = data['data']['title'];
      this.product['price'] = data['data']['price'];
      this.product['baseprice'] = data['data']['price'];
      this.product['modalno'] = data['data']['modalno'];
      this.product['shortdescription'] = data['data']['shortdescription'];
      this.product['fulldescription'] = data['data']['fulldescription'];
      this.product['image'] = data['image'];
      this.product['productimages'] = data['imagearray'].split(',');
      this.product['quantity'] = 1;
      this.product['id'] = data['data']['id'];
      if (this.product['image']) {
        this.product['productimages'].unshift(this.product['image'])
 
      }
      if (this.product['productimages'].length !== 0) {
        this.product['productimages'].forEach((item,key) => {
        
          this.dashboardService.getFile(item).subscribe(result => {
            if (result) {
              item = "data:image/jpg;base64," + result;
              this.product['productimages'].splice(key,1, item)
              this.product['image'] = this.product['productimages'][0];
            }
          })
        })
        
      }
    }, (error) => {
      console.log("product description api " + error);
    });

    this.apollo.watchQuery({
      query: CUSTOMERS_REVIEW,
      variables: { productId: this.productid }
    }).valueChanges.subscribe((response) => {
      let data = response['data']['getCustomerReviewData'];
      this.productReview = data;
      console.log(data);
    }, (error) => {
      console.log("product review api " + error);
    });

  }

  async getImage(id) {
    this.dashboardService.getFile(id).subscribe(result => {
      if (result) {
        return "data:image/jpg;base64," + result;
      } else {
        return null;
      }
    })
  }

  // public trackItem (index: number, item: Item) {
  //   return item.trackId;
  // }

  productStartRate(data: any) {
    let rating: number = 0;
    data.forEach(val => {
      rating += val['starRate'];
    });
    this.starRate = (rating / data.length);
    //  console.log(this.starRate);
  }

  showimage(index): void {
    let image = '';
    let keepGoing = true;

    this.product['productimages'].forEach(function (val, key) {
      if (keepGoing) {
        if (key === index) {
          //    console.log(val.toString());
          image = val;
          keepGoing = false;
        }
      }

    })
    this.product['image'] = image;
    //  console.log(image);
  }

  public carouselTileLoad(evt: any) {

    // const len = this.carouselTileItems.length
    // if (len <= 30) {
    //   for (let i = len; i < len + 10; i++) {
    //     this.carouselTileItems.push(i);
    //   }
    // }

  }

  //------Add to cart----

  AddProduct() {
    //  this.product['added'] = true;
    this.cartService.addProduct(this.product);
  }

  //-----product review-----

  checkLogin() {
    //console.log(localStorage.getItem('auth_token'));
    if (localStorage.getItem('auth_token')) {
      this.router.navigate(['/pages/review', this.productid]);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }



}
