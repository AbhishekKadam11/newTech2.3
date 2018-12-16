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
  public productData: any;

  constructor(private http: Http, private globalShared: GlobalShared) {

  }


  productListData(ptype, selectedChoices?) {
   const headers = new Headers();
   headers.append('Content-Type', 'application/json');

    let params: URLSearchParams = new URLSearchParams();
    params.set('ptype', ptype);
    params.set('selectedChoices', selectedChoices);


    return this.http
      .get(
        this.globalShared['serverpath'] + 'productList',  {
          search: params,
         headers,
        },
        // 'https://newtechserver.herokuapp.com/api/productList',  {
        //   search: params,
        //   headers,
        // },
      )
      .map(res => res.json())
      .map((res) => {
        this.notify.next(res);
        return res;
      });
  }

  public setProductData(data) {
    this.notify.next(data);
    this.productData = data;
  }

  public getproductData() {
    return this.productData;
  }


}
