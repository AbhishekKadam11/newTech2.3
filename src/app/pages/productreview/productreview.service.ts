import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from './../../app.httpclient';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import {GlobalShared} from '../../app.global';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable()

export class ProductreviewService {
  constructor(private http: HttpClient, private globalShared: GlobalShared) {

  }

  setUserReiview(review) {
    // const httpHeaders = new HttpHeaders()
    //   .set('Content-Type', 'application/json');
    // const httpParams = new HttpParams()
    //   .set('review', review);
  
    return this.http.post(this.globalShared['serverpath'] + 'productReview', review)
      .map((res) => {
        return res;
      }, (err) => {
        return err;
      });
  }

}
