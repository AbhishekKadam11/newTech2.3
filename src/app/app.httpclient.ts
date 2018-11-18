import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpClient extends Http {

  constructor(backend: XHRBackend, options: RequestOptions) {
    const token = localStorage.getItem('auth_token'); //  custom token getter function
    options.headers.set('Authorization', token);
    super(backend, options);
  }

 //  createAuthorizationHeader(headers: Headers) {
 //    const token = localStorage.getItem('auth_token');
 // //   headers.append('Authorization', token);
 //    this.headers.append('Authorization', token);
 //   // this.options = new RequestOptions({headers: headers});
 //  }
 //
 //  get(url) {
 //    let headers = new Headers();
 //
 //    this.createAuthorizationHeader(headers);
 //    return this.http.get(url, {
 //      headers: headers
 //    });
 //  }
 //
 //  post(url, data) {
 //    let headers = new Headers();
 //
 //    this.createAuthorizationHeader(headers);
 //    return this.http.post(url, data, {
 //      headers: headers
 //    });
 //  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    const token = localStorage.getItem('auth_token');
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = {headers: new Headers()};
      }
      options.headers.set('Authorization', token);
    } else {
      // we have to add the token to the url object
      url.headers.set('Authorization', token);
    }
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError (self: HttpClient) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      console.log(res);
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
}
