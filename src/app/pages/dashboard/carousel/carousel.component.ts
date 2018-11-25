import { Component, OnInit } from '@angular/core';
// import { NgxCarousel } from 'ngx-carousel';
// import { Carousel } from './carousel.interface';

@Component({
  selector: 'ngbd-carousel',
  templateUrl: './carousel.component.html',

})
export class CarouselComponent implements OnInit {
  slides: any;

  ngOnInit() {
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

