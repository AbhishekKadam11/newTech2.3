import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService} from '../searchresult/searchresult.service';
import { GlobalShared } from '../../app.global';

@Component({
  selector: 'ngx-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss'],
})
export class SearchresultComponent implements OnInit {

  searchkey;
  public products: any;
  errorMessage: string;
  productType: any = {'All': true};
  objectKeys = Object.keys;
  userChoice = [];
  constructor(private route: ActivatedRoute,
              private router: Router,
              public globalShared: GlobalShared,
              private searchService: SearchService) {

  }
  keys: String[];
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.searchkey = params['searchkey'];
      this.searchService.searchItem(params['searchkey']).subscribe((result) => {
        this.products = result;
        for (const value of this.products) {
          this.productType[value['category']] = false;
        }
      }, (error) => {
      //  console.log(error);
        this.errorMessage = error['error'];
      })
    });
  }

  filterProducts(event, category) {

    if ((this.userChoice.length) >=  0 ) {
      this.productType['All'] = false;
    }

    if (event.target.checked) {
      this.userChoice.push(category);
    } else {
      const index = this.userChoice.indexOf(category);
      this.userChoice.splice(index, 1);
    }

    if (category === 'All' && event.target.checked) {
      for (const value in this.productType) {
        this.productType[value] = true;
      }
      this.userChoice = [];
    }

    this.searchService.searchItem( this.searchkey, this.userChoice).subscribe((result) => {
      this.products = result;
      console.log( this.products);
    }, (error) => {
      this.errorMessage = error['error'];
    })
  }

  productDetails(productId) {
    this.router.navigate(['/pages/productdetails', productId ]);
  }

}
