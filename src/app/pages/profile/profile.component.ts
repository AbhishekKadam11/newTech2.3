import { Component, EventEmitter , OnInit, ViewEncapsulation } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ProfileService } from './profile.service'
import { GlobalShared } from '../../app.global';
import { Apollo } from 'apollo-angular';
import { Location } from './entity/Location';
import {
  SET_USER_BASIC_DETAILS,
  CreateLinkMutationResponse,
  USER_BASIC_DETAILS,
  CUSTOMER_ORDER_DETAILS,
  STATE_LIST,
  CITY_LIST
} from '../../graphql';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  public uploader: FileUploader;
  private hasDragOver = false;
  public editmode = true;
  public url = '';
  public profile:any = {};  // model
  public lastOrderList:any = [];  // model
  savedSuccess: boolean = false;
  saveUnsuccess: boolean = false;
  formData: FormData;
  searchedLocation: Location = new Location();
  side = 'right';
  stateList: any;
  cityList:any;

  constructor(private globalShared: GlobalShared,
              private apollo: Apollo) {

    this.apollo.watchQuery({
      query: USER_BASIC_DETAILS

    }).valueChanges.subscribe((response) => {
      let data = response['data']['userBasicDetails'];
      this.profile = data;
      // console.log("pro" + data);
    //  this.profile['extraaddon'] =data['extraaddon'] ? JSON.parse(data['extraaddon']) : {};
    }, (error) => {
      console.log("profile api " + error); 
    });

    this.apollo.watchQuery({
      query: CUSTOMER_ORDER_DETAILS

    }).valueChanges.subscribe((response) => {
      let data = response['data']['customerOrderDetails'];
      this.lastOrderList = data;
      // console.log("OrderDetails" + JSON.stringify(data));
      //  this.profile['extraaddon'] =data['extraaddon'] ? JSON.parse(data['extraaddon']) : {};
    }, (error) => {
      console.log("profile api " + error);
    });

    this.apollo.watchQuery({
      query: STATE_LIST

    }).valueChanges.subscribe((response) => {
      this.stateList = response['data']['stateList'];
      // this.profile = data;
      // console.log("state" +  this.stateList);
    }, (error) => {
      console.log("profile api " + error); 
    });

    this.uploader = new FileUploader({
      url: globalShared['serverpath'] + 'upload',
      disableMultipart: false,
      autoUpload: true
    });

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      this.profile['profilePic'] = response;
      this.url = globalShared['urlpath'] + response;
    };
  }

  ngOnInit() {
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
  }

  public fileOver(e: any): void {
    this.hasDragOver = e;
  }

  getCityList(state) {
    //for city list
    this.apollo.watchQuery({
      query: CITY_LIST,
      variables: {"state": state}
    }).valueChanges.subscribe((response) => {
      this.cityList = response['data']['cityList'];
      // this.profile = data;
      // console.log("cityList" + this.cityList);
    }, (error) => {
      console.log("profile api " + error);
    });
  }

  //last activity
  private alive = true;

  // userActivity: UserActive[] = [];
  type = 'month';
  types = ['week', 'month', 'year'];
  currentTheme: string;


  setProfile(profile) {

    var input = {
      email: profile['email'],
      firstName: profile['firstName'],
      middleName: profile['middleName'],
      lastName: profile['lastName'],
      extraaddon: profile['extraaddon'] ? JSON.stringify(profile['extraaddon']) : null,
      gender: profile['gender'],
      address: profile['address'],
      mobileno: profile['mobileno'],
      profilePic: profile['profilePic'],
      state: profile['state'],
      city: profile['city'],
      profilename: this.profile.profilename
    };
    // console.log(input);
    this.apollo.mutate({
      mutation: SET_USER_BASIC_DETAILS,
      variables: {input}
    }).subscribe((response) => {
      this.savedSuccess = true;
      setTimeout(() => {
        this.savedSuccess = false;
      }, 3000);

    }, (error) => {
      this.saveUnsuccess = true;
      setTimeout(() => {
        this.saveUnsuccess = false;
      }, 3000);
      console.log(error);
    });

  }

  updateLocation(event: Location) {
    this.searchedLocation = new Location(event.latitude, event.longitude);
  }

  events = [
    {
      id: 0,
      title: 'My last travel',
      content: 'There are so much countries in the world...',
      date: '2016 - 2019',
      icon: 'https://image.flaticon.com/icons/svg/214/214335.svg'
    },
    {
      id: 1,
      title: 'My Job',
      content: 'The best job I could possibly get!',
      date: '2015 - 2016',
      icon: 'https://image.flaticon.com/icons/svg/1006/1006517.svg'
    },
    {
      id: 2,
      title: 'My Education',
      content: 'This is the university I went...',
      date: '2011',
      icon: 'https://image.flaticon.com/icons/svg/1141/1141771.svg'
    }
  ];

}
