
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
  query userForLogin($email: String!, $password: String) {
    userForLogin(email: $email, password: $password) {
    email
    profilename
    token
    }
  }
`;

export const PRODUCT_LIST_QUERY = gql`
  query  {
    dashboardProductList
  }
`;

export const PRODUCT_CATEGORY_WISE_LIST_QUERY = gql`
  query productCategoryList($category: String!, $brand: String!){
    productCategoryList(category: $category, brand: $brand) {
      id
      productimages
      title
      brand
      category
      image
    }
  }
`;

export const USER_BASIC_DETAILS = gql`
query {
  userBasicDetails
}
`;

