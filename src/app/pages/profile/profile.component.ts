import { Component, EventEmitter , OnInit, ViewEncapsulation } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ProfileService } from './profile.service'
import { GlobalShared } from '../../app.global';
import { Apollo } from 'apollo-angular';
import { CREATE_LINK_MUTATION_SIGNUP, CreateLinkMutationResponse, USER_BASIC_DETAILS } from '../../graphql';

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

  constructor(private profileService: ProfileService, private globalShared: GlobalShared,
              private apollo: Apollo) {

    // this.profileService.getProfileData().subscribe((result) => {
    //   this.profile = result.userDetails;
    //   this.url = globalShared['urlpath'] + result.userDetails['profilePic'];
    // })

    this.apollo.watchQuery({
      query: USER_BASIC_DETAILS
     
    }).valueChanges.subscribe((response) => {
      console.log(response); 
   //   console.log(JSON.stringify( this.dashboardProducts['graphiccard'])); 
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

  setProfile(profile) {
   // console.log(profile);
    this.profileService.setprofileData(profile)
      .subscribe((result) => {
        this.savedSuccess = true;
        setTimeout(() => {
          this.savedSuccess = false;
        }, 3000);
      },(err)=> {
        this.saveUnsuccess = true;
        setTimeout(() => {
          this.saveUnsuccess = false;
        }, 3000);
      });
  }

}
