import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import {GlobalShared} from '../../app.global';

@Injectable()
export class ProductListService {
  private notify = new Subject();
  notifyObservable$ = this.notify.asObservable();
  public products: any;
  public productSource = new BehaviorSubject([]);
  currentProducts = this.productSource.asObservable();

  constructor(private http: Http, private globalShared: GlobalShared) {

  }

  productList(data: any) {
    let productData =  data['data'].hasOwnProperty('productCategoryList') ? data['data']['productCategoryList'] : data['data']['searchItem'];
    this.products = productData;
    this.productSource.next(productData);
  }

  public getFilteredProduct(brand) {
    let filteredProducts = [];
    for ( let i = 0; i < brand.length; i++ ) {
      for ( let j = 0; j < this.products.length; j++ ) {
        if(brand[i]=== this.products[j]['brand']){
          filteredProducts.push(this.products[j]);
        }
      }
    }
   // this.products = filteredProducts;
    this.productSource.next(filteredProducts);
  }

  // productListData(ptype, selectedChoices?) {
  //  const headers = new Headers();
  //  headers.append('Content-Type', 'application/json');
  //
  //   let params: URLSearchParams = new URLSearchParams();
  //   params.set('ptype', ptype);
  //   params.set('selectedChoices', selectedChoices);
  //
  //
  //   return this.http
  //     .get(
  //       this.globalShared['serverpath'] + 'productList',  {
  //         search: params,
  //        headers,
  //       },
  //       // 'https://newtechserver.herokuapp.com/api/productList',  {
  //       //   search: params,
  //       //   headers,
  //       // },
  //     )
  //     .map(res => res.json())
  //     .map((res) => {
  //       this.notify.next(res);
  //       return res;
  //     });
  // }

  // public setProductData(data) {
  //   this.notify.next(data);
  //   this.productData = data;
  // }
  //
  // public getproductData() {
  //   return this.productData;
  // }


}
