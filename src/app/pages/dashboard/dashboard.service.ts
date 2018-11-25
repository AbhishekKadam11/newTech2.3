import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {GlobalShared} from '../../app.global';

@Injectable()

export class DashboardService {
  constructor(private http: Http, private globalShared: GlobalShared) {

  }

  dashboardProductList() {
 //    return this.http.get('https://newtechserver.herokuapp.com/api/dashboardProductlist')
    return this.http.get(this.globalShared['serverpath'] + 'dashboardProductlist')
      .map(res => res.json())
      .map((res) => {
        return res;
      })
  }


}
