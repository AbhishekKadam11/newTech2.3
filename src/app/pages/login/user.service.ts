import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {GlobalShared} from '../../app.global';
import 'rxjs/add/operator/map'
//import { HttpClient  } from '../../app.httpclient';
// import { ActivatedRoute } from '@angular/router';

@Injectable()
export class UserService {

  public loggedIn = false;
  public profileName: string;
  public userId: string;
  public basicdata: string;

  constructor(private http: Http, private globalShared: GlobalShared) {
  //  this.loggedIn = !!localStorage.getItem('auth_token');
    // this.userId = route.snapshot.params[localStorage.getItem('auth_token')];
  }

  setProfileData(data) {
  //  console.log("set data" + data['profilename']); 
    this.profileName = data['profilename'];
    this.basicdata = data;
    this.loggedIn = true;
    this.getProfileData();
  }

  public getProfileData() {
    return this.basicdata;
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
