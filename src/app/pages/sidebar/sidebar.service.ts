import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

@Injectable()
export class SidebarService {

  constructor(private http: Http) {

  }

}
