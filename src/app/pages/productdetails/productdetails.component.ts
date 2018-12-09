import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, Input, Directive, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductDetailsService } from './productdetails.service'
import { StateService } from '../../../app/@core/data/state.service';
import { CartService } from '../cart/cart.service';
import { NgxCarousel } from 'ngx-carousel';
import { GlobalShared } from '../../app.global';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})

export class ProductdetailsComponent implements OnInit {

  productid: string;
  product: any= {};
  productReview: any= {};
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
  recent: any= {};
  // defaultimage: string;
  // placeholder = 'assets/images/default-placeholder.png';

  constructor(private route: ActivatedRoute, private router: Router,
              private productdetailsaervice: ProductDetailsService,
              private stateService: StateService,
              private cdRef: ChangeDetectorRef,
              public globalShared: GlobalShared,
              private cartService: CartService) {

    this.stateService.setSidebarState(this.stateService.sidebars[2]);

  }

  ngOnInit() {

      this.carouselTile = {
        grid: {xs: 1, sm: 2, md: 2, lg: 3, all: 0},
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

    this.productdetailsaervice.productDescriptionData(this.productid).subscribe((result) => {
      // console.log(result);
      this.product['brand'] = result['data']['brand'];
      this.product['title'] = result['data']['title'];
      this.product['price'] = result['data']['price'];
      this.product['baseprice'] = result['data']['price'];
      this.product['modalno'] = result['data']['modalno'];
      this.product['shortdescription'] = result['data']['shortdescription'];
      this.product['fulldescription'] = result['data']['fulldescription'];
      this.product['image'] = result['image'];
      this.product['productimages'] = result['imagearray'];
      this.product['quantity'] = 1;
      this.product['id'] = result['data']['_id'];
    //  this.productData = result;
    }, (err) => {
      console.log(err);
    });

    this.productdetailsaervice.customerReviewData(this.productid).subscribe((result) => {
      this.productReview = result;
    //  console.log(result);
      this.productStartRate(result);
    }, (err) => {
      console.log(err);
    });

  }

  productStartRate(data:any) {
    let rating: number = 0;
    data.forEach(val =>{
      rating += val['starRate'];
    })
    this.starRate = (rating/data.length);
  //  console.log(this.starRate);
  }

  showimage(index): void {
   let image = '';
    let keepGoing = true;

    this.product['productimages'].forEach(function (val, key) {
      if (keepGoing) {
        if (key === index ) {
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
    if (localStorage.getItem('auth_token')) {
      this.router.navigate(['/pages/review', this.productid]);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }


}
