import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsService } from '../productdetails/productdetails.service';
import { GlobalShared} from '../../app.global';
import { Apollo } from 'apollo-angular';
import {
  PRODUCT_DESCRIPTION,
  SET_CUSTOMER_REVIEW,
  CreateLinkMutationResponse,
  SET_USER_BASIC_DETAILS
} from '../../graphql';
// import '../product/ckeditor.loader';
// import 'ckeditor';

@Component({
  selector: 'ngx-productreview',
  templateUrl: './productreview.component.html',
  styleUrls: ['./productreview.component.scss']
})
export class ProductreviewComponent implements OnInit {

  productid: string;
  product: any = {};
  review: any = {};
  savedSuccess: boolean = false;
  saveUnsuccess: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router,
              public globalShared: GlobalShared,
              private apollo: Apollo,
              private productdetailservice: ProductDetailsService) {
    this.route.params.subscribe(params => {
           this.productid = params['productId'];
      this.getProductDetails(this.productid)
    });

  }

  ngOnInit() {

  }

  getProductDetails(productId) {
    this.apollo.watchQuery({
      query: PRODUCT_DESCRIPTION,
      variables: { pid: this.productid }
    }).valueChanges.subscribe((response) => {
      let data = response['data']['getProductDescriptionData'];
      this.product['brand'] = data['data']['brand'];
      this.product['title'] = data['data']['title'];
      this.product['price'] = data['data']['price'];
      this.product['baseprice'] = data['data']['price'];
      this.product['modalno'] = data['data']['modalno'];
      this.product['image'] = data['image'];
      this.product['id'] = data['data']['id'];
      console.log(data);
    }, (error) => {
      console.log("product description api " + error);
    });

  }

  submitReview() {
    this.review['productId'] = this.productid;

    var input = {
      starRate:this.review['starRate'],
      productId: this.review['productId'],
      comment: this.review['userReview']
    };
    console.log(input);
    this.apollo.mutate({
      mutation: SET_CUSTOMER_REVIEW,
      variables: {input}
    }).subscribe((response) => {
      this.router.navigate(['/pages/productdetails', this.productid ]);
    }, (error) => {
      this.saveUnsuccess = true;
      setTimeout(() => {
        this.saveUnsuccess = false;
      }, 3000);
      console.log(error);
    });


  }

}
