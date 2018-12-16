import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GlobalShared} from '../../app.global';
import {UserService} from '../login/user.service';

@Injectable()
export class RegisterService {
  public loggedIn = false;
  public profileName: string;
  public userId: string;
  public basicdata: string;

  constructor(private http: HttpClient, private globalShared: GlobalShared,
    private userService: UserService) {

  }
  

  register(values) {
    const httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json');

    return this.http.post(this.globalShared['serverpath'] + 'signup', values)
      .map((res) => {
        console.log(res);
          localStorage.setItem('auth_token', res['token']);
       //      this.authtoken.createAuthorizationHeader(res.token);
          var headers = new Headers({'Authorization': res['token']});
          var loggedIn = true;
          this.userService.setProfileData(res);
          return res;
      }, (err) => {
        return err;
      });
  }



}
