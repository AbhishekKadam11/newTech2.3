import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/Observable';
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

  getFile(imageId: string): Observable<any> {
    return this.http.get(`${this.globalShared['imageUrl']}/getFile?filename=${imageId}`)
    .map(res => res.json())
    .map((res) => {
      return res;
    })
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.log(errorMessage);
    return throwError(errorMessage);
}

}
