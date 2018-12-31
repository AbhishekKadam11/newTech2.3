import {NgModule} from '@angular/core';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';

import {Apollo, APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {ApolloLink, concat} from 'apollo-link';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';

const uri = 'http://localhost:8080/graphql/';
// const http = httpLink.create({uri});
export function provideApollo(httpLink: HttpLink) {
  const basic = setContext((op, ctx) => ({
    headers: new HttpHeaders()
      .set('Accept', 'charset=uf-8'),
  }));
  const token = localStorage.getItem('auth_token');
  const auth = setContext((operation, ctx) => ({
    // headers: new HttpHeaders()
    //   .set('Authorization', 'Bearer PlsLogMeIn'),
    headers: ctx.headers.append('Authorization', `Bearer ${token}`)
  }));

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);

  return {
    link,
    cache: new InMemoryCache()
  }
}

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: provideApollo,
    deps: [HttpLink],
  }],
})

export class GraphQLModule {

  constructor() {
  }
}
