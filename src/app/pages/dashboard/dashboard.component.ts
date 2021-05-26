import { Component, OnInit, ViewEncapsulation, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service'
import { NguCarouselConfig, NguCarousel } from '@ngu/carousel';
import { Apollo } from 'apollo-angular';
import { StateService } from '../../../app/@core/data/state.service';
import { GlobalShared } from '../../app.global';
import { CREATE_LINK_MUTATION_SIGNUP, CreateLinkMutationResponse, PRODUCT_LIST_QUERY,
  PRODUCT_CATEGORY_WISE_LIST_QUERY } from '../../graphql';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngu-dashboard',
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
    grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
    slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: false,
      },
      load: 2,
      touch: true,
      easing: 'ease'
  }
 
  constructor(private dashboardService: DashboardService, public globalShared: GlobalShared,
              private router: Router, private stateService: StateService,
              private apollo: Apollo) {

    this.stateService.setSidebarState(this.stateService.sidebars[2]);

    // this.dashboardService.dashboardProductList().subscribe((result) => {
    //   this.dashboardProducts = result;
    //   this.processor = result['processor'];
    //   this.graphiccard = result['graphiccard'];
    //   this.motherboard = result['motherboard'];
    //   this.monitor = result['monitor'];
    //   this.routers = result['router'];
    // //  this.spinnerService.hide();
    //   this.isRunning = false;
    // });

    
    this.apollo.watchQuery({
      query: PRODUCT_LIST_QUERY
     
    }).valueChanges.subscribe((response) => {
      this.dashboardProducts = JSON.parse(response['data']['dashboardProductList']);
      this.processor = JSON.parse(this.dashboardProducts['Processor']);
      this.graphiccard = this.dashboardProducts['Graphic Card'] ? JSON.parse(this.dashboardProducts['Graphic Card']) : false;
      // this.motherboard = this.dashboardProducts['Motherboard'] ? JSON.parse(this.dashboardProducts['Motherboard']) : false;
      this.monitor = this.dashboardProducts['Monitor'] ? JSON.parse(this.dashboardProducts['Monitor']) : false;
      this.routers = this.dashboardProducts['Router'] ? JSON.parse(this.dashboardProducts['Router']) : false;
      this.isRunning = false;
      // if (this.processor.length !== 0) {
      //   this.processor.map(item => {
      //     this.dashboardService.getFile(item['image']).subscribe(result=>{
           
      //       // console.log("getFile",result)
      //       if(result){
      //         item['image'] = "data:image/jpg;base64," + result;
      //       }
      //     })
      //   })
      // }

      // if (this.motherboard.length !== 0) {
      //   this.motherboard.map(item => {
      //     this.dashboardService.getFile(item['image']).subscribe(result=>{
      //       if(result){
      //         item['image'] = "data:image/jpg;base64," + result;
      //       }
      //     })
      //     return item;
      //   })
      // }
  
   //   console.log(JSON.stringify( this.dashboardProducts['graphiccard'])); 
    }, (error) => {
      console.log("test" + error); 
    });

    //for motherboard
    this.apollo.watchQuery({
      query: PRODUCT_CATEGORY_WISE_LIST_QUERY,
      variables: {  category: "Motherboard",
                    brand: "" }
    }).valueChanges.subscribe((response) => {
      this.motherboard = response['data']['productCategoryList'];
        if (this.motherboard.length !== 0) {
        this.motherboard.map(item => {
          this.dashboardService.getFile(item['image']).subscribe(result=>{
            if(result){
              item['image'] = "data:image/jpg;base64," + result;
            }
          })
          return item;
        })
      }
    }, (error) => {
      console.log("test" + error);
    });
  }

  slides: any;

  ngOnInit() {
   this.carouselTile = {
    grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
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
  //  console.log("test" + productId); 
    this.router.navigate(['/pages/productdetails', productId ]);
  //  this.router.navigateByUrl('pages/productDetails');
  }



}
