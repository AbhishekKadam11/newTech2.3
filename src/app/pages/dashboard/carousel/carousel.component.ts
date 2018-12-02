import { Component, OnInit } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
// import { NgxCarousel } from 'ngx-carousel';
// import { Carousel } from './carousel.interface';

@Component({
  selector: 'ngux-carousel',
  templateUrl: './carousel.component.html',

})
export class CarouselComponent implements OnInit {
  slides: any;
  public carouselTile: NguCarouselConfig;
 
  ngOnInit() {
    this.carouselTile = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
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
        }
      },
      {
        id: 'slide-2',
        img: {
          url: '../../../assets/images/slides/banner2.jpg'
        }
      },
      {
        id: 'slide-3',
        img: {
          url: '../../../assets/images/slides/banner3.jpg',
        }
      },
      {
        id: 'slide-4',
        img: {
          url: '../../../assets/images/slides/banner4.jpg',
        }
      },
      {
        id: 'slide-5',
        img: {
          url: '../../../assets/images/slides/banner5.jpg',
        }
      }
    ];
  }



}

