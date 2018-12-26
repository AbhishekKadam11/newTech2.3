import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from './../../app.httpclient';
import {GlobalShared} from '../../app.global';

@Injectable()

export class ProfileService {
  constructor(private http: HttpClient, private globalShared: GlobalShared) {

  }

  getProfileData() {
     return this.http.get(this.globalShared['serverpath'] + 'userBasicDetails')
  //     return this.http.get('https://newtechserver.herokuapp.com/api/userBasicDetails')
      .map(res => res.json())
      .map((res) => {
        return res;
      })
  }

  setprofileData(profile) {
    var profiledata = JSON.stringify({ data: profile });
     return this.http.post(this.globalShared['serverpath'] + 'profiledata', profile)
//    return this.http.post('https://newtechserver.herokuapp.com/api/profiledata', profile)
      .map(res => res.json())
      .map((res) => {
        return res;
      })
  }

}
