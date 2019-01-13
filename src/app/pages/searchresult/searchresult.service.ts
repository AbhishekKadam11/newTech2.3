import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { HttpClient } from './../../app.httpclient';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {GlobalShared} from '../../app.global';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable()

export class SearchService {
  constructor(private http: HttpClient, private globalShared: GlobalShared) {

  }

  searchItem(keyword, selectedCategories?) {
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const httpParams = new HttpParams()
      .set('searchKey', keyword)
      .set('categories', selectedCategories);
     return this.http.get(this.globalShared['serverpath'] + 'searchItem', {
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

//   setprofileData(profile) {
//     var profiledata = JSON.stringify({ data: profile });
//      return this.http.post('http://localhost:8080/api/profiledata', profile)
// //    return this.http.post('https://newtechserver.herokuapp.com/api/profiledata', profile)
//       .map(res => res.json())
//       .map((res) => {
//         return res;
//       })
//   }

}
