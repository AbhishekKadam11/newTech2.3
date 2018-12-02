import { Component, OnInit, ViewEncapsulation, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service'
import { NguCarouselConfig, NguCarousel } from '@ngu/carousel';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { StateService } from '../../../app/@core/data/state.service';
import { GlobalShared } from '../../app.global';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',

})

export class DashboardComponent implements OnInit {

  dashboardProducts;
  processor;
  graphiccard;
  monitor;
  routers;
  motherboard;
  public isRunning: boolean = true;
  public carouselTileItems: Array<any>;
  public carouselTile: NguCarouselConfig;
  @ViewChild('myCarousel') myCarousel: NguCarousel<string>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 3,
    interval: {timing: 4000, initialDelay: 1000},
    loop: true,
    touch: true,
    velocity: 0.2
  }
 
  constructor(private dashboardService: DashboardService, public globalShared: GlobalShared,
              private router: Router, private stateService: StateService) {

    this.stateService.setSidebarState(this.stateService.sidebars[2]);

    this.dashboardService.dashboardProductList().subscribe((result) => {
      this.dashboardProducts = result;
      this.processor = result['processor'];
      this.graphiccard = result['graphiccard'];
      this.motherboard = result['motherboard'];
      this.monitor = result['monitor'];
      this.routers = result['router'];
    //  this.spinnerService.hide();
      this.isRunning = false;
    });

  }

  slides: any;

  ngOnInit() {
   this.carouselTile = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 2,
    interval: {timing: 3000, initialDelay: 1000},
    loop: true,
    touch: false,
    velocity: 0.3
    };

    this.slides = [
      {
        id: 'slide-1',
        img: {
          url: '../../../assets/images/slides/banner1.jpg',
        },
      },
      {
        id: 'slide-2',
        img: {
          url: '../../../assets/images/slides/banner2.jpg',
        },
      },
      {
        id: 'slide-3',
        img: {
          url: '../../../assets/images/slides/banner3.jpg',
        },
      },
      {
        id: 'slide-4',
        img: {
          url: '../../../assets/images/slides/banner4.jpg',
        },
      },
      {
        id: 'slide-5',
        img: {
          url: '../../../assets/images/slides/banner5.jpg',
        },
      },
    ];

  }

  public carouselTileLoad(evt: any) {

    // const len = this.carouselTileItems.length
    // if (len <= 30) {
    //   for (let i = len; i < len + 10; i++) {
    //     this.carouselTileItems.push(i);
    //   }
    // }

  }

  startLoadingSpinner() {
  //  this.spinnerService.show();
    // To test threshold change delay in query string it accepts time in secs
    }

  productDetails(productId) {
    this.router.navigate(['/pages/productdetails', productId ]);
  //  this.router.navigateByUrl('pages/productDetails');
  }



}
