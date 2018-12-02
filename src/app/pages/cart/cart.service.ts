import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class CartService {
  constructor(private http: Http) {

  }
  Products = [];
  private cartSubject = new Subject();
  CartState = this.cartSubject.asObservable();
  public cart: any = {};

  getCartItems() {
    this.cart = localStorage.getItem('cart');
    if (this.cart) {
       this.Products = JSON.parse(this.cart);
    }
    return this.cart;
  }

  addProduct(product: any) {

    this.Products.push(product);
    localStorage.setItem('cart', JSON.stringify(this.Products));
    this.cartSubject.next({loaded: true, products: this.Products});
  //  console.log(this.Products);
  }
  removeProduct(index: number) {
    console.log(index);
    this.Products.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.Products));
    this.cartSubject.next({loaded: false , products:  this.Products});
  }

  emptyCart() {
    localStorage.removeItem('cart');
    this.cartSubject.next({loaded: true, products: 0});
  }

  // getAllProducts() : Observable <any> {
  //   // return this.httpclient.get(url).map((res : Response) => res.json())
  //   //   .catch((error : any) => Observable.throw('Server error'));
  // }


}
