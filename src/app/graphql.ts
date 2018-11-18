
import gql from 'graphql-tag'
import { onError } from "apollo-link-error";


export const CREATE_LINK_MUTATION_SIGNUP = gql`
 
mutation signup($input: UserInput!){
  signup(input: $input) {
    email
    profilename
    token
  }
}
`;

export interface CreateLinkMutationResponse {
//   createLink: Link;
//   loading: boolean;
}

export const SIGN_IN_QUERY = gql`
  query  {
    userForLogin(email: "test@mail.com", password: "12346789") {
    email
    profilename
    token
    }
  }
`;

