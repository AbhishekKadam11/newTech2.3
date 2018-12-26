import {NgModule} from '@angular/core';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';

import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {ApolloLink, concat} from 'apollo-link';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
 
  constructor(apollo: Apollo, httpLink: HttpLink) {

    const uri = 'http://localhost:8080/graphql/';
    const http = httpLink.create({ uri });
    let headers = new Headers();
  
    
    const auth = setContext((_,  headers ) => {
     // let head = headers;
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('auth_token');
      // return the headers to the context so httpLink can read them
      // in this example we assume headers property exists
      // and it is an instance of HttpHeaders
      if (!token) {
        return {};
      } else {
        return {
          headers: {
                 Authorization: `Bearer ${token}`
              }
        };
      }
    });

    // const auth = setContext((_, {  }) => {
    //   // get the authentication token from local storage if it exists
    //   const token = localStorage.getItem('auth_token');
    //   // return the headers to the context so httpLink can read them
    //   // in this example we assume headers property exists
    //   // and it is an instance of HttpHeaders
    //   if (!token) {
    //     return {};
    //   } else {
    //     return {
    //       headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    //     //  headers: headers.append('Authorization', `Bearer ${token}`)
    //     };
    //   }
    // });
    apollo.create({
    link: auth.concat(http),
      cache: new InMemoryCache()
    });
    
  }
}