import {Component, OnInit} from '@angular/core';
// import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { CartService } from './cart.service'

@Component({
  selector: 'ngx-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],

})
export class CartComponent implements OnInit {
  loaded: boolean = true;
  products: any;
  itemcount: number;
  public cartData: any = {};
  private subscription: Subscription;


  constructor(private cartService: CartService) {}
  ngOnInit() {
  //  this.cartData =  this.cartService.getCartItems();
  //  console.log(JSON.parse(this.cartData));
    this.cartData =  JSON.parse(this.cartService.getCartItems());
    if ( this.cartData ) {
        this.itemcount = this.cartData.length;
    }

    this.subscription = this.cartService.CartState
      .subscribe((state) => {
        this.products = state;
        this.itemcount = state['products'].length;

      });

  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
