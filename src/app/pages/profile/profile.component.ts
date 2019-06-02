import { Component, EventEmitter , OnInit, ViewEncapsulation } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ProfileService } from './profile.service'
import { GlobalShared } from '../../app.global';
import { Apollo } from 'apollo-angular';
import { SET_USER_BASIC_DETAILS, CreateLinkMutationResponse, USER_BASIC_DETAILS } from '../../graphql';

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
  savedSuccess: boolean = false;
  saveUnsuccess: boolean = false;
  formData: FormData;

  constructor(private globalShared: GlobalShared,
              private apollo: Apollo) {

    this.apollo.watchQuery({
      query: USER_BASIC_DETAILS

    }).valueChanges.subscribe((response) => {
      let data = response['data']['userBasicDetails'];
      this.profile = data;
      this.profile['extraaddon'] =data['extraaddon'] ? JSON.parse(data['extraaddon']) : {};
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
      profilename: this.profile.profilename
    };
    console.log(input);
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

}
