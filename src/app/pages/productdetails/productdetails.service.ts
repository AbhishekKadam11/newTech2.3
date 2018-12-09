import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {GlobalShared} from '../../app.global';
// import {HttpHeaders, HttpParams} from "@angular/common/http";


@Injectable()
export class ProductDetailsService {
  constructor(private http: HttpClient, private globalShared: GlobalShared) {

  }

  productDescriptionData(pid) {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const httpParams = new HttpParams()
      .set('pid', pid);
    return this.http
      .get(
        this.globalShared['serverpath'] + 'productDescriptionData/',
        //'https://newtechserver.herokuapp.com/api/productDescriptionData/' + pid,
        {
          headers: httpHeaders,
          params: httpParams
        })
      .map((res) => {
        return res;
      }, (err) => {
        return err;
      });
  }

  customerReviewData(productId) {
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const httpParams = new HttpParams()
      .set('productId', productId);
    return this.http.get(this.globalShared['serverpath'] + 'productReview',
      {
      headers: httpHeaders,
      params: httpParams,
      responseType: 'json',
    })
      .map((res) => {
        return res;
      }, (err) => {
        return err;
      });
  }

}
