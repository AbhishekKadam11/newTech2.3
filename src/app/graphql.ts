
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
  query productCategoryList($category: String!, $brand: String){
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
  userBasicDetails {
  profilename
  email
  extraaddon
  firstName
  middleName
  lastName
  address
  mobileno
  profilePic
  gender
  }
}
`;

export const SET_USER_BASIC_DETAILS = gql`
mutation userBasicDetails($input: UserInput!){
  userBasicDetails(input: $input) {
  id
  }
}
`;

export const PRODUCT_DESCRIPTION = gql`
  query getProductDescriptionData($pid: String!){
    getProductDescriptionData(pid: $pid) {
       data {
    		id
        image
        title
        brand
        modalno
        price
        fulldescription
        shortdescription
      }
    image
    imagearray
    }
  }
`;

export const CUSTOMERS_REVIEW = gql`
   query getCustomerReviewData($productId: String!){
    getCustomerReviewData(productId: $productId) {
    id
    postDate
    comment
    starRate
    name
    }
  }
`;

export const SET_CUSTOMER_REVIEW = gql`
mutation productReview($input: ProductReviewInput!){
  productReview(input: $input) {
  id
  }
}
`;

export const SET_CUSTOMER_ORDER = gql`
mutation placeOrder($input: OrdersInput!){
  placeOrder(input: $input) {
  id
  }
}
`;

export const SEARCH_ITEM = gql`
   query searchItem($searchKey: String!, $category: String){
    searchItem(searchKey: $searchKey, category: $category) {
    id
    title
    brand
    category
    modalno
    price
    image
    shortdescription
    fulldescription
    productimages
    arrivaldate
    }
  }
`;

export const CUSTOMER_ORDER_DETAILS = gql`
query {
  customerOrderDetails {
   orderId
    requestdate
 		productDescription{
      data {
        id
        title
        image
      }
    }
  }
}
`;
