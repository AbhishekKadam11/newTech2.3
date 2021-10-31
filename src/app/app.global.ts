import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class GlobalShared {

  // urlpath: string = ((window.location.href).substr(0,5 ) === 'https') ? 'https://newtechserver2.herokuapp.com/' : 'http://localhost:8080/' ;
  // urlpath: string = 'http://localhost:8080/';
   serverpath: string = 'https://newtechserver2.herokuapp.com/graphql/';
  //  serverpath: string = 'https://zab2d4fc2-z0b528ced-gtw.qovery.io/graphql/';
  //  serverpath: string = 'http://localhost:8080/graphql/';
   defaultimage: string = 'assets/images/default-placeholder.png'; // '../assets/images/default-placeholder.png'
  //  imageUrl: string = 'https://newtechadminapi.netlify.app/.netlify/functions/index';
  //  imageUrl: string = 'https://main-newtech-p6g7tpooam6b2xjm-gtw.qovery.io';
   imageUrl: string = 'https://zab2d4fc2-ze4f79cf3-gtw.qovery.io';
}
